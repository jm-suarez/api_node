# API NODE

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu sistema:

- Node.js
- PostgreSQL 

## Configuración

1. Crea una base de datos en PostgreSQL para el proyecto.

```sql
CREATE DATABASE nombre_de_la_base_de_datos;
```

2. configura config/config.json de Sequelize para el proyecto.

```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "usip",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "usip",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "postgres",
    "database": "usip",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

3. Configura las credenciales de la base de datos en un archivo .env en la raíz del proyecto.

```plaintext
JWT_SECRET=JzdWIiOiIxMjM0NTY3ODkwIiwibmF
NODE_ENV=development
PORT=3500
```

4. Clona este repositorio en tu máquina local:

```plaintext
git clone https://github.com/jm-suarez/api_node.git
```

5. Navega al directorio del proyecto:

```plaintext
cd nombre_del_proyecto
```

6. Instala las dependencias del proyecto:

```plaintext
npm install
```

7. Aplicar migraciones pendientes:

```plaintext
npx sequelize-cli db:migrate
```

8. Ejecutar los seeders.

```plaintext
node src/seeders/seed.js
```




