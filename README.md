# API_TINDER - SwipeSpark

Servicio API REST para la creacion de una red social de citas.

## Instalación

Lo primero que tenemos que hacer es cambiar el nombre al archivo **.env.example** por **.env**.

Despues instalamos todas las librerias usando el comando

```http
  npm install
```

Para realizar las migrations a la bbdd creamos primero una bbdd y la guardamos en el **.env** en el **db_name**, y ejecutamos el siguiente comando:

```http
  npx sequelize db:migrate
```

Para ejecutar los seeders usamos este comando

```http
  npx sequelize-cli db:seed:all
```

## API Reference

#### Registro de usuarios

**Método:** `POST`

- **Descripción:** Permite crear un nuevo usuario. Si el correo esta registrado ya en la BBDD este no se creara. El estado de este usuario por defecto estara inactivo hasta que el administrador lo habilite, para que pueda interactuar en la plataforma.

```http
  localhost:9090/api/registrar
```

```json
{
  "nombre": "Nombre de Usuario",
  "email": "usuario2@example.com",
  "contrasena": "contraseña_segura",
  "foto": "url_de_la_foto",
  "nick": "nickname",
  "rolID": 1,
  "estado": "activo"
}
```

#### Login

**Método:** `POST`

- **Descripción:** Inicia sesion de un usuario, si el usuario esta inactivo le avisa en otra pantalla, sea un usuario o un administrador. Si es administrador o un usuario activo accede ira a su pantalla correpondiente.

```http
  localhost:9090/api/login
```

```json
{
  "email": "usuario@example.com",
  "contrasena": "contraseña_segura"
}
```

#### Busqueda de usuarios

**Método:** `GET`

- **Descripción:** Buscamos todos los usuarios de la tabla en la BBDD

```http
  localhost:9090/api/usuarios
```

#### Busqueda de usuario por ID

**Método:** `GET`

- **Descripción:** Buscamos un usuario de la tabla en la BBDD filtrando por su ID

```http
  localhost:9090/api/usuario/id
```

#### Actualizar usuario por id

**Método:** `PUT`

- **Descripción:** Actualizamos cualquier campo del usuario por su ID. pondre un ejemplo con todos los que puede actualizar pero dentro este ejemplo puede estar sujeto a cambios.

```http
  localhost:9090/api/usuario/id
```

```json
{
  "nombre": "Nombre de Usuario",
  "email": "m.gd@outlook.es",
  "contrasena": "contraseña_segura",
  "foto": "url_de_la_foto",
  "nick": "nickname",
  "rolID": 2,
  "estado": "activo"
}
```

#### Eliminar un usuario por ID

**Método:** `DELETE`

- **Descripción:** Eliminamos un usuario de la tabla en la BBDD filtrando por su ID

```http
  localhost:9090/api/usuario/id
```

#### Creacion de eventos

**Método:** `POST`

- **Descripción:** Creamos un nuevo evento.

```http
  localhost:9090/api/crear/evento
```

```json
{
  "nombre": "Concierto de Rock",
  "fechaRealizacion": "2023-07-15T20:00:00Z",
  "geolocalizacion": "Parque Central, Ciudad Nueva",
  "descripcion": "Un evento imperdible para los amantes del rock.",
  "fechaCierreInscripcion": "2023-07-01T23:59:59Z"
}
```

#### Busqueda de eventos

**Método:** `GET`

- **Descripción:** Buscamos todos los eventos de la tabla en la BBDD

```http
  localhost:9090/api/eventos
```

#### Busqueda de usuario por ID

**Método:** `GET`

- **Descripción:** Buscamos un evento de la tabla en la BBDD filtrando por su ID

```http
  localhost:9090/api/usuario/id
```

#### Actualizar evento por id

**Método:** `PUT`

- **Descripción:** Actualizamos cualquier campo de un evento por su ID. pondre un ejemplo con todos los que puede actualizar pero dentro este ejemplo puede estar sujeto a cambios.

```http
  localhost:9090/api/evento/id
```

```json
{
  "nombre": "Concierto de Pop",
  "fechaRealizacion": "2023-07-15T20:00:00Z",
  "geolocalizacion": "Parque Central, Ciudad Nueva",
  "descripcion": "Un evento imperdible para los amantes del rock.",
  "fechaCierreInscripcion": "2023-07-01T23:59:59Z"
}
```

#### Eliminar un evento por ID

**Método:** `DELETE`

- **Descripción:** Eliminamos un evento de la tabla en la BBDD filtrando por su ID

```http
  localhost:9090/api/evento/id
```

#### Creacion de preferencias de usuario

**Método:** `POST`

- **Descripción:** Creamos una preferencia para un usuario

```http
  localhost:9090/api/preferencia/id
```

```json
{
  "usuarioID": 1,
  "tipo": "colore_favorito",
  "valor": "rojo"
}
```

#### Creacion de preferencias de usuarios

**Método:** `POST`

- **Descripción:** Creamos varias preferencias para un usuario

```http
  localhost:9090/api/preferencias/id
```

```json
[
  {
    "usuarioID": 1,
    "tipo": "color_fsavorito",
    "valor": "azul"
  },
  {
    "usuarioID": 1,
    "tipo": "colores_favorito",
    "valor": "rojo"
  }
]
```

#### Busqueda de preferencias

**Método:** `GET`

- **Descripción:** Buscamos todas preferencias del usuario filtrando por su id de usuario

```http
  localhost:9090/api/preferencias/id
```

#### Actualizar preferencia del usuario

**Método:** `PUT`

- **Descripción:** Actualizamos una preferencia de un usuario por el id del usuario

```http
  localhost:9090/api/preferencia/id
```

```json
{
  "id": 1,
  "tipo": "color_favorito",
  "valor": "rojo"
}
```

#### Busqueda de preferencias

**Método:** `GET`

- **Descripción:** Buscamos todas preferencias del usuario filtrando por su id de usuario

```http
  localhost:9090/api/preferencias/id
```

#### Actualizar preferencias del usuario

**Método:** `PUT`

- **Descripción:** Actualizamos varias preferencias de un usuario por el id del usuario

```http
  localhost:9090/api/preferencia/id
```

```json
[
  {
    "id": 1,
    "tipo": "color_favorito",
    "valor": "rojo"
  },
  {
    "id": 2,
    "tipo": "color_favorito",
    "valor": "rojo"
  }
]
```

#### Eliminar una preferencia de un usuario

**Método:** `DELETE`

- **Descripción:** Eliminamos una preferencia del usuario filtrando por su id de usuario

```http
  localhost:9090/api/preferencias/id
```

```json
{
  "id": 1,
  "tipo": "color_favorito",
  "valor": "rojo"
}
```

#### Eliminar varias preferencia de un usuario

**Método:** `DELETE`

- **Descripción:** Eliminamos varias preferencias del usuario filtrando por su id de usuario

```http
  localhost:9090/api/preferencias/id
```

```json
[
  {
    "id": 1,
    "tipo": "color_favorito",
    "valor": "rojo"
  },
  {
    "id": 2,
    "tipo": "color_favorito",
    "valor": "rojo"
  }
]
```
