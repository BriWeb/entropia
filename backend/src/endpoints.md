# Endpoints

## Usuario

### _Login_

**POST** `/usuarios/login`

- **Descripción:** Valida que la cuenta y contraseña ingresada existan
- **Parámetros:** Recibe un json con el usuario y la contraseña a través del body

```json
{
  "usuario": "micuenta",
  "contrasenia": "12345"
}
```

#### **Caso de éxito**

- **Código:** `200 OK`
- **Respuesta:** Devuelve un json con los datos del usuario que se loguea

```json
//El siguiente es un usuario sin rol
{
  "id": 1,
  "nombre": "Jon",
  "apellido": "Doe",
  "documento": "39457731",
  "tipo": null,
  "especialidad": null,
  "obra_social": null,
  "legajo": null,
  "is_admin": false,
  "codigo_estado": 0,
  "mensaje": "OK"
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

### _Buscar paciente_

**GET** `/paciente/:documento`

- **Descripcion:** Busca un paciente filtrando por documento
- **Parámetros:** Recibe el documento del paciente a través de la url

```json
/paciente/29339701
```

#### Caso de éxito

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con los datos del paciente encontrado

```json
{
  "id": 2,
  "nombre": "Paciente",
  "apellido": "Cualquiera",
  "documento": "29339701",
  "obra_social": 1
}
```

#### Caso de error

- **Código:** 200 OK
- **Respuesta:** Devuelve un json con un mensaje de error

```json
{
  "mensaje": "No existe el paciente en la base de datos"
}
```

---

### _Agregar paciente_

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

#### Caso de éxito

- **Código:** 201 Created
- **Respuesta:** Devuelve un json con el id del paciente

```json
{
  "paciente_id": 3
}
```

---

### _Agregar médico_

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

#### Caso de éxito

- **Código:** 201 Created
- **Respuesta:** Devuelve un json con el id del médico creado

```json
{
  "id": 1
}
```

---

### \_\_

\*\* \*\* ``

- **Descripcion:**
- **Parámetros:**

```json
{}
```

#### Caso de éxito

- **Código:**
- **Respuesta:**

```json
{}
```

#### Caso de error

- **Código:**
- **Respuesta:**

```json
{}
```

---
