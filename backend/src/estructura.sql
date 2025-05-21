if not exists (select * from sys.databases where name = 'Prueba')
begin
	create database prueba
end;
use entropia;
go;


IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'persona')
BEGIN
	EXEC('CREATE SCHEMA persona');
END;

--drop table persona.tipo_persona;
if not exists (select * from sys.tables where name = 'tipo_persona')
begin
	create table persona.tipo_persona(
		id int identity(1,1) primary key,
		descripcion varchar(25) not null
	);
end;

--drop table persona.persona;
if not exists (select * from sys.tables where name = 'persona')
begin
	create table persona.persona(
		id int identity(1,1),
		nombre varchar(25) not null,
		apellido varchar(25) not null,
		documento varchar(25) not null,
		tipo_persona_id int,
		constraint fk_tipo_persona foreign key (tipo_persona_id)
		references persona.tipo_persona(id),
		constraint pk_persona primary key (id)
	);
end;

--drop table persona.usuario;
if not exists (select * from sys.tables where name = 'usuario')
begin 
	create table persona.usuario(
		id int identity(1,1),
		usuario varchar(25) not null,
		contrasenia varchar(25) not null,
		administrador bit not null default 0,
		persona_id int not null,
		constraint fk_usuariopersona_id foreign key (persona_id)
		references persona.persona(id),
		constraint pk_usuario primary key (id)
	)
end;

--drop table persona.recepcion;
if not exists (select * from sys.tables where name = 'recepcion')
begin
	create table persona.recepcion(
		id int identity(1,1),
		legajo varchar(25) not null,
		persona_id int not null,
		constraint fk_recepcionpersona_id foreign key (persona_id)
		references persona.persona(id),
		constraint pk_recepcion primary key (id)
	);
end;

--drop table persona.paciente;
if not exists (select * from sys.tables where name = 'paciente')
begin
	create table persona.paciente(
		id int identity(1,1),
		obra_social bit not null,
		persona_id int not null,
		constraint fk_pacientepersona_id foreign key (persona_id)
		references persona.persona(id),
		constraint pk_paciente primary key (id)
	);
end;

--drop table persona.especialidad;
if not exists (select * from sys.tables where name = 'especialidad')
begin
	create table persona.especialidad(
		id int identity(1,1),
		descripcion varchar(25) not null,
		constraint pk_especialidad primary key (id)
	);
end;

--drop table persona.medico;
if not exists (select * from sys.tables where name = 'medico')
begin
	create table persona.medico(
		id int identity(1,1),
		especialidad_id int not null,
		persona_id int not null,
		constraint fk_medicoespecialidad_id foreign key (especialidad_id)
		references persona.especialidad(id),
		constraint fk_medicopersona_id foreign key (persona_id)
		references persona.persona(id),
		constraint pk_medico primary key (id)
	);
end;

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'turno')
BEGIN
	EXEC('CREATE SCHEMA turno');
END;

--drop table turno.estado;
if not exists (select * from sys.databases where name = 'estado')
begin
	create table turno.estado(
		id int identity(1,1),
		descripcion varchar(25) not null,
		constraint pk_estado primary key (id)
	);
end

--drop table turno.horario;
if not exists (select * from sys.databases where name = 'horario')
begin
create table turno.horario (
    id int identity(1,1),
    horario TIME(0) NOT NULL,
		constraint pk_horario primary key (id)
);
end;

--drop table turno.turno;
if not exists (select * from sys.databases where name = 'turno')
begin
	create table turno.turno(
		id int identity(1,1),
		horario_id int not null,
		fecha date not null,
		estado_id int not null default 1,
		paciente_id int not null,
		medico_id int not null,
		recepcion_id int not null,
		observacion varchar(150),
    constraint CH_Fecha check (fecha >= CAST(GETDATE() AS DATE)),
		constraint pk_turno primary key (id),
		constraint fk_turnohorario_id foreign key (horario_id)
		references turno.horario (id),
		constraint fk_turnoestado_id foreign key (estado_id)
		references turno.estado (id),
		constraint fk_turnopaciente_id foreign key (paciente_id)
		references persona.paciente (id),
		constraint fk_turnomedico_id foreign key (medico_id)
		references persona.medico (id),
		constraint fk_turnorecepcion_id foreign key (recepcion_id)
		references persona.recepcion (id)
	);
end;
go;


--drop function ValidarUsuario;
CREATE or alter FUNCTION persona.ValidarUsuario ( --✔️
    @Usuario NVARCHAR(50),
    @Contrasenia NVARCHAR(50)
)
RETURNS int
AS
BEGIN
    DECLARE @UsuarioId INT;

	SELECT @UsuarioId = id 
	FROM persona.usuario
	WHERE usuario = @Usuario AND contrasenia = @Contrasenia;

    IF @UsuarioId IS NULL
		SET @UsuarioId = 0;

	RETURN @UsuarioId;
END
GO
--SELECT persona.ValidarUsuario('brherrera', '1234');


--drop procedure GetUserData;
CREATE or alter PROCEDURE GetUserData --✔️
	@Usuario NVARCHAR(50),
    @Contrasenia NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @PersonaId INT;
	DECLARE @TipoPersonaDescripcion NVARCHAR(50);
	DECLARE @TipoPersonaId INT;
	DECLARE @IsAdmin BIT;

	DECLARE @UsuarioId int;
	SELECT @UsuarioId = persona.ValidarUsuario(@Usuario, @Contrasenia);

	IF @UsuarioId = 0
	BEGIN
		SELECT 
			1 AS codigo_estado,
			'Usuario y/o contraseña incorrecta.' as mensaje;
		RETURN;
	END;

	SELECT 
		@PersonaId = us.persona_id,
		@TipoPersonaId = ti_pe.id, 
		@TipoPersonaDescripcion = ti_pe.descripcion,
		@IsAdmin = us.administrador
	FROM persona.usuario as us
	JOIN persona.persona as pe 
	ON us.persona_id = pe.id
	left join persona.tipo_persona as ti_pe
	on pe.tipo_persona_id = ti_pe.id
	WHERE us.id = @UsuarioId;
	

	if @TipoPersonaId is null
	begin
		SELECT 
			@PersonaId as persona_id,
			@UsuarioId as usuario_id,
			pe.nombre,
			pe.apellido,
			pe.documento,
			@Usuario as usuario,
			null as tipo_persona_descripcion,
			null as tipo_persona_id,
			null as especialidad_id,
			null as legajo,
			@IsAdmin as is_admin,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona pe
		WHERE pe.id = @PersonaId;
		return;
	end;

	if @TipoPersonaId = 2 --'Medico'
	begin
		SELECT 
			@PersonaId as persona_id,
			@UsuarioId as usuario_id,
			pe.nombre,
			pe.apellido,
			pe.documento,
			@Usuario as usuario,
			@TipoPersonaDescripcion as tipo_persona_descripcion,
			@TipoPersonaId as tipo_persona_id,
			me.especialidad_id,
			null as legajo,
			@IsAdmin as is_admin,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona pe
		JOIN persona.medico as me
		ON me.persona_id = pe.id
		WHERE pe.id = @PersonaId;
		return;
	end;

	if @TipoPersonaId = 3 --'Recepcion'
	begin
		SELECT 
			@PersonaId as persona_id,
			@UsuarioId as usuario_id,
			pe.nombre, 
			pe.apellido,
			pe.documento,
			@TipoPersonaDescripcion as tipo_persona_descripcion,
			@TipoPersonaId as tipo_persona_id,
			null as especialidad_id,
			re.legajo,
			@IsAdmin as is_admin,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona as pe
		JOIN persona.recepcion as re
		ON re.persona_id = pe.id
		WHERE pe.id = @PersonaId;
		return;
	END;
END;
go;


--drop procedure GetPersonData;
CREATE or alter PROCEDURE GetPersonData --✔️
	@PersonaId int
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @TipoPersonaDescripcion NVARCHAR(50);
	DECLARE @TipoPersonaId INT;

	if not exists(
		select 1 
		from persona.persona
		where id = @PersonaId
	)	
	BEGIN
		SELECT 
			1 AS codigo_estado,
			'No existe una persona con ese id.' as mensaje;
		RETURN;
	END;


	SELECT 
		@TipoPersonaId = ti_pe.id, 
		@TipoPersonaDescripcion = ti_pe.descripcion
	FROM persona.persona as pe
	left join persona.tipo_persona as ti_pe
	on pe.tipo_persona_id = ti_pe.id
	WHERE pe.id = @PersonaId;


	if @TipoPersonaId is null
	begin
		SELECT 
			@PersonaId as persona_id,
			pe.nombre,
			pe.apellido,
			pe.documento,
			null as tipo_persona_descripcion,
			null as tipo_persona_id,
			null as obra_social,
			null as especialidad_id,
			null as legajo,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona pe
		WHERE pe.id = @PersonaId;
		return;
	end;

	if @TipoPersonaId = 1 --'Paciente'
	begin
		SELECT 
			@PersonaId as persona_id,
			pe.nombre,
			pe.apellido,
			pe.documento,
			@TipoPersonaDescripcion as tipo_persona_descripcion,
			@TipoPersonaId as tipo_persona_id,
			pa.obra_social,
			null as especialidad_id,
			null as legajo,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona pe
		JOIN persona.paciente as pa
		ON pa.persona_id = pe.id
		WHERE pe.id = @PersonaId;
		return;
	end;

	if @TipoPersonaId = 2 --'Medico'
	begin
		SELECT 
			@PersonaId as persona_id,
			pe.nombre,
			pe.apellido,
			pe.documento,
			@TipoPersonaDescripcion as tipo_persona_descripcion,
			@TipoPersonaId as tipo_persona_id,
			null as obra_social,
			me.especialidad_id,
			null as legajo,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona pe
		JOIN persona.medico as me
		ON me.persona_id = pe.id
		WHERE pe.id = @PersonaId;
		return;
	end;

	if @TipoPersonaId = 3 --'Recepcion'
	begin
		SELECT 
			@PersonaId as persona_id,
			pe.nombre, 
			pe.apellido,
			pe.documento,
			@TipoPersonaDescripcion as tipo_persona_descripcion,
			@TipoPersonaId as tipo_persona_id,
			null as obra_social,
			null as especialidad_id,
			re.legajo,
			0 AS codigo_estado,
			'OK' as mensaje
		FROM persona.persona as pe
		JOIN persona.recepcion as re
		ON re.persona_id = pe.id
		WHERE pe.id = @PersonaId;
		return;
	END;
END;
go;


--drop procedure SearchPacienteByDocumento
create or alter procedure SearchPacienteByDocumento 
@Documento varchar(50)
as
begin
    SET NOCOUNT ON;

	IF EXISTS (
	  SELECT 1
	  FROM persona.paciente AS pa
	  JOIN persona.persona AS pe ON pe.id = pa.persona_id
	  WHERE pe.documento = @Documento
	)
	begin
		select 
			pe.id as persona_id, 
			pa.id as paciente_id, 
			pe.nombre, pe.apellido, 
			pe.documento, 
			pa.obra_social,
			'Paciente encontrado' AS mensaje,
			0 AS codigo_estado
		from persona.paciente as pa
		join persona.persona as pe
		on pe.id = pa.persona_id
		where pe.documento = @Documento;
	end
	else
	begin
		SELECT 
			'No existe un paciente con ese documento' AS mensaje,
			1 AS codigo_estado;
	end;
end;
go;


--drop procedure AddPaciente;
CREATE or alter PROCEDURE AddPaciente --✔️
	@Nombre NVARCHAR(25),
	@Apellido NVARCHAR(25),
	@Documento NVARCHAR(25),
	@ObraSocial bit,
	@PacienteId INT OUTPUT
AS
begin
	declare @IdTipoPaciente int;
	DECLARE @NewPersonaId INT;

	select @IdTipoPaciente = id from persona.tipo_persona
	where descripcion = 'Paciente';
	
	IF @IdTipoPaciente IS NULL
	BEGIN
		RAISERROR('Tipo de persona "Paciente" no encontrado.', 16, 1);
		RETURN;
	END

	DECLARE @NewPersona TABLE (id int);
	INSERT into persona.persona(nombre, apellido, documento, tipo_persona_id)
	OUTPUT inserted.id into @NewPersona(id)
	values (@Nombre, @Apellido, @Documento, @IdTipoPaciente);

	SELECT @NewPersonaId = id FROM @NewPersona;


	DECLARE @NewPaciente TABLE (id int);
	insert into persona.paciente (obra_social, persona_id)
	OUTPUT inserted.id into @NewPaciente(id)
	values (@ObraSocial, @NewPersonaId);

	SELECT @PacienteId = id FROM @NewPaciente;
end;
go;


--drop procedure Admin_AddMedico
CREATE or alter PROCEDURE Admin_AddMedico --✔️
	@Nombre NVARCHAR(25),
	@Apellido NVARCHAR(25),
	@Documento NVARCHAR(25),
	@Especialidad_id int,
	@medico_id INT OUTPUT
AS
begin
	declare @TipoMedicoId int;
	select @TipoMedicoId = id from persona.tipo_persona
	where descripcion = 'Medico';
	
	IF @TipoMedicoId IS NULL
	BEGIN
		RAISERROR('Tipo de persona "Medico" no encontrado.', 16, 1);
		RETURN;
	END

	DECLARE @NewPersona TABLE (id int);
	INSERT into persona.persona(nombre, apellido, documento, tipo_persona_id)
	OUTPUT inserted.id into @NewPersona(id)
	values (@Nombre, @Apellido, @Documento, @TipoMedicoId);

	DECLARE @PersonaId INT;
	SELECT @PersonaId = id FROM @NewPersona;


	DECLARE @NewMedico TABLE (id int);
	insert into persona.medico (especialidad_id, persona_id)
	OUTPUT inserted.id into @NewMedico(id)
	values (@Especialidad_id, @PersonaId);

	SELECT @medico_id = id FROM @NewMedico;
end;
go;


--drop procedure Admin_AddRecepcion
CREATE or alter PROCEDURE Admin_AddRecepcion --✔️
	@Nombre NVARCHAR(25),
	@Apellido NVARCHAR(25),
	@Documento NVARCHAR(25),
	@Legajo varchar(25),
	@Id INT OUTPUT
AS
begin
	declare @TipoRecepcionId int;
	select @TipoRecepcionId = id from persona.tipo_persona
	where descripcion = 'Recepcion';
	
	IF @TipoRecepcionId IS NULL
	BEGIN
		RAISERROR('Tipo de persona "Recepcion" no encontrado.', 16, 1);
		RETURN;
	END

	DECLARE @NewPersona TABLE (id int);
	INSERT into persona.persona(nombre, apellido, documento, tipo_persona_id)
	OUTPUT inserted.id into @NewPersona(id)
	values (@Nombre, @Apellido, @Documento, @TipoRecepcionId);

	DECLARE @PersonaId INT;
	SELECT @PersonaId = id FROM @NewPersona;


	DECLARE @NewRecepcion TABLE (id int);
	insert into persona.recepcion (legajo, persona_id)
	OUTPUT inserted.id into @NewRecepcion(id)
	values (@Legajo, @PersonaId);

	SELECT @Id = id FROM @NewRecepcion;
end;
go;


--drop procedure AddTurno
create or alter procedure AddTurno --✔️
	@Horario_id int,
	@Fecha date,
	@Paciente_id int,
	@Medico_id int,
	@Recepcion_id int,
	@Id INT OUTPUT
as
begin
	declare @Id_table table (id int);

	insert into turno.turno (horario_id, fecha, paciente_id, medico_id, recepcion_id)
	output inserted.id into @Id_table(id)
	values (@Horario_id, @Fecha, @Paciente_id, @Medico_id, @Recepcion_id);

	SELECT @Id = id FROM @Id_table;
end;
go;


--drop view GetTurnos
create or alter view GetTurnos as --✔️
select 
	tu.id,
	es.descripcion as "estado_turno",
	es.id as "estado_turno_id",
	tu.horario_id,
	ho.horario,
	tu.fecha,
	med.id as "medico_id",
	per.nombre as "nombre_medico",
	per.apellido as "apellido_medico",
	esp.descripcion as "especialista_en",
	esp.id as "especialista_en_id",
	per_2.nombre as "nombre_paciente",
	per_2.apellido as "apellido_paciente", 
	pac.obra_social,
	per_3.nombre as "nombre_recepcion",
	per_3.apellido as "apellido_recepcion", 
	rec.legajo
from turno.turno as tu
join turno.estado as es
on tu.estado_id = es.id
join turno.horario as ho
on tu.horario_id = ho.id
join persona.medico as med
on tu.medico_id = med.id
join persona.persona as per
on per.id = med.persona_id
join persona.especialidad as esp
on med.especialidad_id = esp.id
join persona.paciente as pac
on tu.paciente_id = pac.id
join persona.persona as per_2
on pac.persona_id = per_2.id 
join persona.recepcion as rec
on tu.recepcion_id = rec.id
join persona.persona as per_3
on rec.persona_id = per_3.id;
go;


--drop procedure AvailableTurnos
create or alter procedure AvailableTurnos
@Especialista int,
@FechaFinal DATE
as
begin
	IF @FechaFinal < CAST(GETDATE() AS DATE)
	BEGIN
		RAISERROR ('La fecha final debe ser mayor o igual a la fecha actual.', 16, 1);
		RETURN;
	END;

	WITH FechasPosibles AS (
		-- Generar todas las fechas desde hoy hasta la fecha final
		SELECT CAST(GETDATE() AS DATE) AS fecha
		UNION ALL
		SELECT DATEADD(DAY, 1, fecha)
		FROM FechasPosibles
		WHERE fecha < @FechaFinal
	),
	HorariosAsignados AS (
		-- Obtener horarios y fechas asignados
		SELECT horario, fecha
		FROM GetTurnos
		WHERE estado_turno_id != 3 
			AND especialista_en_id = @Especialista
	),
	HorariosFiltrados AS (
    -- Excluir horarios anteriores a la hora actual para el día de hoy
    SELECT ho.horario, fp.fecha
    FROM turno.horario ho
    CROSS JOIN FechasPosibles fp
    WHERE NOT EXISTS (
      SELECT 1
      FROM HorariosAsignados ha
      WHERE ha.horario = ho.horario AND ha.fecha = fp.fecha
    )
    AND (
      fp.fecha > CAST(GETDATE() AS DATE)
      OR (fp.fecha = CAST(GETDATE() AS DATE) AND ho.horario >= CAST(GETDATE() AS TIME))
    )
	)
	SELECT horario, fecha
	FROM HorariosFiltrados
	OPTION (MAXRECURSION 0);
end;
go;


--EXEC SearchPacienteByDocumento '42.678.35';

--INSERTANDO DATOS PARA PROBAR
--insert into persona.tipo_persona (descripcion) values ('Paciente'), ('Medico'), ('Recepcion');
--select * from persona.tipo_persona;
--insert into turno.estado (descripcion) values ('Asignado'), ('En atencion'), ('Finalizado');
--select * from turno.estado;
--insert into persona.persona (nombre, apellido, documento) values ('Brian', 'Herrera', '37.274.854');
--insert into persona.persona (nombre, apellido, documento, tipo_persona_id) values ('Juan', 'Villalba', '42.678.351', 1), ('Pedro', 'Rosa', '52.566.129', 2), ('Veronica', 'Amado', '35.876.942', 3);
--select * from persona.persona;
--insert into persona.usuario (usuario, contrasenia, administrador, persona_id) values ('brherrera', '1234', 0, 1);
--select * from persona.usuario;
--insert into persona.especialidad (descripcion) values ('General'), ('Pediatría'), ('Ginecología'), ('Dentista'), ('Dermatología'), ('Cardiología'), ('Psiquiatría'), ('Traumatología');
--select * from persona.especialidad;
--insert into persona.paciente (obra_social, persona_id) values (1, 2);
--insert into persona.medico (especialidad_id, persona_id) values (4, 3);
--insert into persona.recepcion (legajo, persona_id) values ('13252', 4);
--select * from persona.paciente;
--select * from persona.medico;
--select * from persona.recepcion;


--STORE PARA OBTENER LA INFORMACIÓN DEL USUARIO QUE SE LOGUEA
--select * from persona.usuario
--insert into persona.usuario (usuario, contrasenia, persona_id) values ('brherrera', '1234', 1);
--EXEC GetUserData 'brherrera', '1234';


--STORE PARA AGREGAR PACIENTES
--DECLARE @PacienteId INT;
--EXEC AddPaciente 'Pedrito', 'Lopez', '25.444.987', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Juan', 'Perez', '25.111.987', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Maria', 'Gomez', '30.222.456', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Carlos', 'Sanchez', '27.333.789', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Laura', 'Diaz', '28.444.123', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Francisco', 'Lopez', '29.555.654', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Luisa', 'Martinez', '31.666.321', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Miguel', 'Fernandez', '32.777.890', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Camila', 'Vega', '33.888.432', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Javier', 'Ramirez', '34.999.876', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Sofia', 'Torres', '35.111.234', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Diego', 'Navarro', '36.222.345', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Valentina', 'Correa', '37.333.678', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Lucas', 'Gutierrez', '38.444.901', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Martina', 'Mendez', '39.555.123', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Oscar', 'Alvarez', '40.666.543', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Ana', 'Suarez', '41.777.876', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Roberto', 'Rojas', '42.888.234', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Carolina', 'Silva', '43.999.567', 1, @PacienteId OUTPUT;
--EXEC AddPaciente 'Eduardo', 'Morales', '44.111.789', 0, @PacienteId OUTPUT;
--EXEC AddPaciente 'Isabel', 'Castro', '45.222.432', 1, @PacienteId OUTPUT;
--SELECT @PacienteId AS Id;


--select * from persona.persona;
--select * from persona.paciente;


--STORE PARA AGREGAR MÉDICOS
--DECLARE @MedicoId INT;
--EXEC Admin_AddMedico 'Esteban', 'Prado', '45.802.930', 1, @MedicoId OUTPUT;
--EXEC Admin_AddMedico 'José', 'Hernández', '44.702.980', 2, @MedicoId OUTPUT;
--EXEC Admin_AddMedico 'Esteban', 'Prado', '45.802.930', 3, @MedicoId OUTPUT;
--EXEC Admin_AddMedico 'Raúl', 'Benitez', '35.002.801', 5, @MedicoId OUTPUT;
--EXEC Admin_AddMedico 'Jon', 'Jimenez', '55.200.752', 6, @MedicoId OUTPUT;
--EXEC Admin_AddMedico 'Maria', 'Prado', '54.337.933', 7, @MedicoId OUTPUT;
--EXEC Admin_AddMedico 'Sofia', 'Santos', '34.282.390', 8, @MedicoId OUTPUT;
--SELECT @MedicoId AS Id;


--select * from persona.persona;
--select * from persona.medico;


--STORE PARA AGREGAR RECEPCIONISTAS
--DECLARE @RecepcionId INT;
--EXEC Admin_AddRecepcion 'Laura', 'Monserrat', '35.073.537', '2231', @RecepcionId OUTPUT;
--EXEC Admin_AddRecepcion 'Ana', 'Diaz', '25.071.263', '2232', @RecepcionId OUTPUT;
--EXEC Admin_AddRecepcion 'Carlos', 'Morales', '37.453.168', '2233', @RecepcionId OUTPUT;
--SELECT @RecepcionId AS Id;


--select * from persona.persona;
--select * from persona.recepcion;


--AGREGAR HORARIOS
--WITH Horarios AS (
--    SELECT CAST('09:00' AS TIME) AS horario
--    UNION ALL
--    SELECT DATEADD(MINUTE, 30, horario)
--    FROM Horarios
--    WHERE horario < '18:00'
--)
--INSERT INTO turno.horario (horario)
--SELECT horario FROM Horarios
--OPTION (MAXRECURSION 0);


--STORE PARA AGREGAR TURNOS
--DECLARE @TurnoId INT;
--EXEC AddTurno 1, '04/04/2025', 1, 2, 1, @TurnoId OUTPUT;
--SELECT @TurnoId AS Id;


--INSERT INTO turno.turno (horario_id, fecha, paciente_id, medico_id, recepcion_id)
--VALUES 
--(1, '2025-04-08', 1, 2, 1), (2, '2025-04-08', 2, 3, 2), (3, '2025-04-08', 3, 7, 3), 
--(4, '2025-04-09', 4, 5, 4), (5, '2025-04-09', 5, 6, 1), (6, '2025-04-09', 6, 7, 2), 
--(7, '2025-04-09', 7, 8, 3), (8, '2025-04-10', 8, 1, 4), (9, '2025-04-10', 9, 3, 1), 
--(10, '2025-04-10', 10, 2, 2), (11, '2025-04-11', 11, 3, 3), (12, '2025-04-11', 12, 5, 4), 
--(13, '2025-04-11', 13, 5, 1), (14, '2025-04-11', 14, 6, 2), (15, '2025-04-12', 15, 7, 3), 
--(16, '2025-04-12', 16, 8, 4), (17, '2025-04-12', 17, 1, 1), (18, '2025-04-12', 18, 4, 2), 
--(1, '2025-04-13', 19, 2, 3), (2, '2025-04-13', 20, 3, 4), (3, '2025-04-13', 21, 5, 1), 
--(4, '2025-04-13', 22, 5, 2), (5, '2025-04-14', 1, 6, 3), (6, '2025-04-14', 2, 7, 4), 
--(7, '2025-04-14', 3, 8, 1), (8, '2025-04-14', 4, 1, 2), (9, '2025-04-15', 5, 6, 3), 
--(10, '2025-04-15', 6, 2, 4), (11, '2025-04-15', 7, 3, 1), (12, '2025-04-15', 8, 1, 2), 
--(13, '2025-04-16', 9, 5, 3), (14, '2025-04-16', 10, 6, 4), (15, '2025-04-16', 11, 7, 1), 
--(16, '2025-04-16', 12, 8, 2), (17, '2025-04-16', 13, 1, 3), (18, '2025-04-16', 14, 4, 4), 
--(1, '2025-04-17', 15, 2, 1), (2, '2025-04-17', 16, 3, 2), (3, '2025-04-17', 17, 7, 3), 
--(4, '2025-04-17', 18, 5, 4), (5, '2025-04-18', 19, 6, 1), (6, '2025-04-18', 20, 7, 2), 
--(7, '2025-04-18', 21, 8, 3), (8, '2025-04-18', 22, 1, 4), (9, '2025-04-18', 1, 8, 1), 
--(10, '2025-04-19', 2, 2, 2), (11, '2025-04-19', 3, 3, 3);


--VISTA PARA VER TODOS LOS TURNOS
--select * from GetTurnos
--where estado_turno_id != 3 and especialista_en_id = 2;


--VISTA PARA VER TODOS LOS TURNOS DISPONIBLES DE UNA ESPECIALIDAD
EXEC AvailableTurnos 2, '2025-05-17'--'09/04/2025'; --2025-04-08 09:30:00