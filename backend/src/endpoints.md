# <div style="text-align: center">Endpoints de Usuario</div>

### Login

**POST** `/usuario/login`

- **Descripción:** Valida que _usuario_ y _contraseña_ ingresados pertenezcan a una cuenta
- **Parámetros:** Recibe un json con el _usuario_ y la _contraseña_ a través del body

```json
{
  "usuario": "esprado",
  "contrasenia": "1234"
}
```

#### **Caso de éxito**

- **Código:** `200 OK`
- **Respuesta:** Devuelve un json con el token y el tipo de usuario

```json
{
  "tipo_usuario": 2,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hX2lkIjoyNiwidXN1YXJpb19pZCI6MywidGlwb19wZXJzb25hX2lkIjoyLCJpYXQiOjE3NDU3MDAwNjgsImV4cCI6MTc0NTcwMzY2OH0.XDHB3aYVXJSVptHGlBCYXQek6NwRDSA-C5PCljq2L2w"
}
```

#### **Caso de error**

- **Código:** `401 Unauthorized`
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "Usuario y/o contraseña incorrecta."
}
```

---

### Validación de usuario logueado

De aquí en adelante todos los endpoints son privados, por lo que para acceder se deberá proporcionar en los encabezados el `TOKEN` asociado al usuario de la siguiente forma:

```js
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}
```

En caso de no proporcionar un token, la respuesta de cualquier endpoint será:

```json
{
  "mensaje": "Token no proporcionado"
}
```

En caso de proporcionar un token inválido, la respuesta de cualquier endpoint será:

```json
{
  "mensaje": "Token inválido"
}
```

---

### Buscar persona

**GET** `/persona/3`

- **Descripcion:** Busca una persona por _id_
- **Parámetros:** Recibe el _id_ de la persona a través de url params

```js
`/persona/${id}`;
```

#### **Caso de éxito**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con los datos de la persona encontrada

```json
{
  "persona_id": 3,
  "nombre": "Pedro",
  "apellido": "Rosa",
  "documento": "52566129",
  "tipo_persona_descripcion": "Medico",
  "tipo_persona_id": 2,
  "obra_social": null,
  "especialidad_id": 4,
  "legajo": null
}
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No existe una persona con ese id."
}
```

---

### Buscar paciente

**GET** `/paciente?documento=42678351`

- **Descripcion:** Busca un paciente filtrando por _documento_
- **Parámetros:** Recibe el _documento_ del paciente a través de query params

```js
`/paciente?documento=${documento}`;
```

#### **Caso de éxito**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con los datos del paciente encontrado

```json
{
  "persona_id": 2,
  "paciente_id": 1,
  "nombre": "Juan",
  "apellido": "Villarba",
  "documento": "42678351",
  "obra_social": 1
}
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No existe un paciente con ese documento"
}
```

---

### Agregar paciente

**POST** `/paciente/add/`

- **Descripcion:** Agrega un paciente. Sólo lo puede usar un/a recepcionista
- **Parámetros:** Recibe un json con los datos del paciente a través del body

```json
{
  "nombre": "Nuevo",
  "apellido": "Paciente",
  "documento": "48200699",
  "obra_social": 0
}
```

#### **Caso de éxito**

- **Código:** `201 Created`
- **Respuesta:** Devuelve un json con el id del paciente

```json
{
  "paciente_id": 3
}
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

````json
{
  "mensaje": "Ocurrió un error inesperado."
}

---

### Agregar médico

**POST** `/medico/add/`

- **Descripcion:** Agrega un médico. Sólo lo puede usar un/a recepcionista
- **Parámetros:** Recibe un json con los datos del médico a través del body

```json
{
  "nombre": "Nuevo",
  "apellido": "Médico",
  "documento": "51203109",
  "especialidad_id": 2
}
````

#### **Caso de éxito**

- **Código:** `201 Created`
- **Respuesta:** Devuelve un json con el id del médico

```json
{
  "medico_id": 1
}
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

````json
{
  "mensaje": "Ocurrió un error inesperado."
}

---

### Agregar recepcionista

**POST** `/recepcionista/add/`

- **Descripcion:** Agrega un recepcionista. Sólo lo puede usar un/a recepcionista
- **Parámetros:** Recibe un json con los datos del médico a través del body

```json
{
  "nombre": "Nuevo",
  "apellido": "Recepcionista",
  "documento": "51203109",
  "legajo": "2337"
}
````

#### **Caso de éxito**

- **Código:** `201 Created`
- **Respuesta:** Devuelve un json con el id del médico

```json
{
  "recepcion_id": 4
}
```

---

### Buscar turnos

**GET** `/turno`

- **Descripcion:** Busca todos los turnos
- **Parámetros:** No recibe nada

#### **Caso de éxito**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con todos los turnos

```json
[
  {
    "id": 49,
    "estado_turno": "Asignado",
    "estado_turno_id": 1,
    "horario_id": 1,
    "horario": "1970-01-01T09:00:00.000Z",
    "fecha": "2025-04-08T00:00:00.000Z",
    "medico_id": 2,
    "nombre_medico": "Esteban",
    "apellido_medico": "Prado",
    "especialista_en": "General",
    "especialista_en_id": 1,
    "nombre_paciente": "Juan",
    "apellido_paciente": "Villalba",
    "obra_social": true,
    "nombre_recepcion": "Veronica",
    "apellido_recepcion": "Amado",
    "legajo": "13252"
  },
  {
    "id": 50,
    "estado_turno": "Asignado",
    "estado_turno_id": 1,
    "horario_id": 2,
    "horario": "1970-01-01T09:30:00.000Z",
    "fecha": "2025-04-08T00:00:00.000Z",
    "medico_id": 3,
    "nombre_medico": "José",
    "apellido_medico": "Hernández",
    "especialista_en": "Pediatría",
    "especialista_en_id": 2,
    "nombre_paciente": "Pedrito",
    "apellido_paciente": "Lopez",
    "obra_social": false,
    "nombre_recepcion": "Laura",
    "apellido_recepcion": "Monserrat",
    "legajo": "2231"
  },
  {
    "id": 51,
    "estado_turno": "Asignado",
    "estado_turno_id": 1,
    "horario_id": 3,
    "horario": "1970-01-01T10:00:00.000Z",
    "fecha": "2025-04-08T00:00:00.000Z",
    "medico_id": 7,
    "nombre_medico": "Maria",
    "apellido_medico": "Prado",
    "especialista_en": "Psiquiatría",
    "especialista_en_id": 7,
    "nombre_paciente": "Juan",
    "apellido_paciente": "Perez",
    "obra_social": false,
    "nombre_recepcion": "Ana",
    "apellido_recepcion": "Diaz",
    "legajo": "2232"
  }
]
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No se encontraron turnos."
}
```

---

### Buscar un turno

**GET** `/turno?id=50`

- **Descripcion:** Busca un turno filtrado por id
- **Parámetros:** Recibe el _id_ del turno a través de query params

```js
`/turno?id=${id}`;
```

#### **Caso de éxito**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con el turno

```json
[
  {
    "id": 50,
    "estado_turno": "Asignado",
    "estado_turno_id": 1,
    "horario_id": 2,
    "horario": "1970-01-01T09:30:00.000Z",
    "fecha": "2025-04-08T00:00:00.000Z",
    "medico_id": 3,
    "nombre_medico": "José",
    "apellido_medico": "Hernández",
    "especialista_en": "Pediatría",
    "especialista_en_id": 2,
    "nombre_paciente": "Pedrito",
    "apellido_paciente": "Lopez",
    "obra_social": false,
    "nombre_recepcion": "Laura",
    "apellido_recepcion": "Monserrat",
    "legajo": "2231"
  }
]
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No se encontró turno."
}
```

Los turnos también pueden ser filtrados por:

- estado_turno_id,
- horario_id,
- fecha,
- fecha_minima,
- fecha_maxima,
- medico_id,
- especialista_en_id,
- nombre_paciente,
- apellido_paciente,
- obra_social,
- legajo.

---

### Agregar turno

**POST** `/turno/add/`

- **Descripcion:** Agrega un turno. Sólo lo puede usar un/a recepcionista
- **Parámetros:** Recibe un json con los datos del turno a través del body

```json
{
  "horario_id": 3,
  "fecha": "2025-05-25",
  "paciente_id": 9,
  "medico_id": 2,
  "recepcion_id": 3
}
```

#### **Caso de éxito**

- **Código:** `201 Created`
- **Respuesta:** Devuelve un json con el id del turno

```json
{
  "Id": 97
}
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "Ocurrió un error inesperado."
}
```

---

### Buscar turnos disponibles

**GET** `/turno/available?especialista_en_id=1&fecha_final=2025-05-17`

- **Descripcion:** Busca todos los turnos disponibles
- **Parámetros:** Recibe _especialista_en_id_ y _fecha_final_ del turno a través de query params

#### **Caso de éxito**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con todos los turnos disponibles

```js
`/turno/available?especialista_en_id=${especialista_en_id}&fecha_final=${fecha_final}`;
```

#### **Caso de error**

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No se encontraron turnos."
}
```

---
