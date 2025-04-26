# <div style="text-align: center">Endpoints de Usuario</div>

### <span style="color: #bdbd4a"> Login </span>

**POST** `/usuarios/login`

- **Descripción:** Valida que _usuario_ y _contraseña_ ingresados pertenezcan a una cuenta
- **Parámetros:** Recibe un json con el _usuario_ y la _contraseña_ a través del body

```json
{
  "usuario": "micuenta",
  "contrasenia": "12345"
}
```

#### <span style="color: #1b671b">**Caso de éxito**</span>

- **Código:** `200 OK`
- **Respuesta:** Devuelve un json con los datos del usuario que se loguea

```json
//El siguiente es un usuario sin rol
{
  "id": 1,
  "nombre": "Jon",
  "apellido": "Doe",
  "documento": "39457731",
  "usuario": "micuenta",
  "tipo": null,
  "tipo_persona_id": null,
  "especialidad": null,
  "obra_social": null,
  "legajo": null,
  "is_admin": false,
  "codigo_estado": 0,
  "mensaje": "OK"
}
```

#### <span style="color: #c52828">**Caso de error**</span>

- **Código:** `401 Unauthorized`
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "Usuario y/o contraseña incorrecta."
}
```

---

### <span style="color: #bdbd4a">Buscar paciente</span>

**GET** `/paciente?documento=` + documento

- **Descripcion:** Busca un paciente filtrando por _documento_
- **Parámetros:** Recibe el _documento_ del paciente a través de query params

```json
/paciente?documento=29339701
```

#### <span style="color: #1b671b">**Caso de éxito**</span>

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con los datos del paciente encontrado

```json
{
  "paciente_id": 2,
  "nombre": "Paciente",
  "apellido": "Cualquiera",
  "documento": "29339701",
  "obra_social": 1
}
```

#### <span style="color: #c52828">**Caso de error**</span>

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No existe un paciente con ese documento"
}
```

---

### <span style="color: #bdbd4a">Agregar paciente</span>

**POST** `/recepcion/agregar_paciente/`

- **Descripcion:** Agrega un paciente. Sólo lo puede usar un/a recepcionista
- **Parámetros:** Recibe un json con los datos del paciente a través del body

```json
{
  "nombre": "Paciente",
  "apellido": "Nuevo",
  "documento": "48200699",
  "obra_social": 0
}
```

#### <span style="color: #1b671b">**Caso de éxito**</span>

- **Código:** 201 Created
- **Respuesta:** Devuelve un json con el id del paciente

```json
{
  "paciente_id": 3
}
```

---

### <span style="color: #bdbd4a">Agregar médico</span>

**POST** `/recepcion/agregar_medico/`

- **Descripcion:** Agrega un médico. Sólo lo puede usar un/a recepcionista
- **Parámetros:** Recibe un json con los datos del médico a través del body

```json
{
  "nombre": "Médico",
  "apellido": "Nuevo",
  "documento": "51203109",
  "especialidad_id": 2 //el id de la especialidad médica
}
```

#### <span style="color: #1b671b">**Caso de éxito**</span>

- **Código:** 201 Created
- **Respuesta:** Devuelve un json con el id del médico

```json
{
  "medico_id": 1
}
```

---

### <span style="color: #bdbd4a">Agregar recepcionista</span>

\*\* \*\* ``

- **Descripcion:**
- **Parámetros:**

```json
{}
```

#### <span style="color: #1b671b">**Caso de éxito**</span>

- **Código:**
- **Respuesta:**

```json
{}
```

#### <span style="color: #c52828">**Caso de error**</span>

- **Código:**
- **Respuesta:**

```json
{}
```

---
