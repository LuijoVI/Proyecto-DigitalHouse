# DigitalBooking

## Descripción

Aplicación web para la gestión de reservas de alojamientos. Permite a los usuarios buscar, visualizar detalles, registrar cuentas, iniciar sesión, marcar favoritos y realizar reservas. Incluye panel de administración y pruebas automatizadas.

## Estructura del proyecto

```
Proyecto-DigitalHouse/
│
├── backend/         # API REST con Spring Boot y MySQL
│   └── digitalbooking/
│       ├── src/
│       ├── pom.xml
│       └── ...
│
├── frontend/        # Interfaz web con ReactJS
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Testing/         # Pruebas automatizadas (JUNIT, Postman, Selenium)
│   ├── JUNIT/
│   ├── *.side
│   └── *.postman_collection.json
│
└── qodana.yaml      # Configuración de análisis estático
```

## Tecnologías utilizadas

### Frontend

- ReactJS (Create React App)
- React Router Dom
- CSS Modules
- FontAwesome
- React Image Gallery
- AWS SDK para S3

### Backend

- Spring Boot
- Spring Data JPA
- Spring Security
- MySQL
- JWT (Json Web Token)
- AWS SDK para S3
- Swagger (documentación de API)

### Testing

- JUnit (Java)
- Selenium IDE
- Postman

## Instalación y ejecución

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend/digitalbooking
mvn clean install
mvn spring-boot:run
```

Configura tu base de datos MySQL según los scripts en `backend/insert_db_digitalbooking.sql` y `backend/schema_db_digitalbooking.sql`.

### Testing

- Ejecuta pruebas JUnit desde el IDE o línea de comandos.
- Abre los archivos `.side` con Selenium IDE.
- Importa la colección Postman para pruebas de API.

## Scripts útiles

- `npm run build` (frontend): Compila la app para producción.
- `mvn test` (backend): Ejecuta los tests automáticos.
- `npm run prod` (frontend): Despliega en AWS S3.

## Licencia y Disclaimer

Este proyecto ha sido realizado exclusivamente con fines educativos como parte de la certificación Professional Developer de la academia DigitalHouse. No debe ser tomado como un proyecto comercial ni utilizado en producción.
