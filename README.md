## Consideraciones antes de instalar

Para instalar este proyecto debes tener instalados los siguientes programas en su computador.

- [GIT](https://git-scm.com).
- [Node](https://nodejs.org/en/).
- [NPM](https://www.npmjs.com).
- [MySQL](https://www.mysql.com).

## Instalación

**1. Clonar el proyecto**

Para clonar el proyecto en su computador local debe abrir una Terminal de comandos (Bash, CMD, Powershell, entre otras) y ubicarse en el directorio donde quiere clonar, luego ejecutar el siguiente comando:

~~~
git clone https://github.com/Ilumiant/technical-test.git
~~~
***
**2. Instalar dependencias**

El repositorio contiene dos carpetas 'test-server' y 'test-client' las cuales conciernen al proyecto de backend y el proyecto de frontend respectivamente.

Debe ingresar a cada carpeta, y en cada una de las carpetas deberá abrir una terminal y ejecutar el siguiente comando:

~~~
npm install
~~~

Recuerde ejecutar el comando en ambos proyectos.
***
**3. Crear las variables de entorno**

Para simplicidad de la ejecución de la aplicación se ha creado un archivo .env en la raiz de cada proyecto para administrar las variables de entorno, si usted tiene alguna configuración distinta a la estándar puede editar estos archivos de modo que coincidan con los valores necesarios para su ejecución.

***
**4. Iniciar proyecto del servidor**

***4.1 Ejecutar MySQL***

Antes de ejecutar el servidor debe asegurarse que MySQL se está ejecutando en su ordenador ya este es necesario para la creación y conexión con la base de datos, debe acceder al archivo 'test-server/.env' y colocar en los siguientes campos la información necesaria para dicha conexión:

~~~
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=task_db
DB_HOST='127.0.0.1'
DB_PORT=3306
DB_DIALECT=mysql
~~~

El campo 'DB_DATABASE' puede tener el nombre que usted desee, y dicho nombre debe corresponder con la base de datos que usted cree, para ello debe acceder a su manejador de base de datos o a la terminal de MySQL y crear una base de datos con exactamente el nombre que colocó en el campo 'DB_DATABASE'.

Los campos 'DB_USERNAME' y 'DB_PASSWORD' se establece el nombre de usuario y la contraseña para dar los permisos necesarios a la base de datos.

Los campos 'DB_HOST' y 'DB_PORT' suelen tener estos valores por defecto, aunque si usted necesita modificarlos ya que la base de datos no apunta a loca los puede modificar sin problemas.

***4.2 Crear tablas en la base de datos***

Ya configurado el MySQL debe crear las tablas necesarias para que la aplicación funcione, para ello deberá acceder desde una terminal a la carpeta 'test-server' y ejecutar el siguiente comando:

~~~
npm run migrate
~~~

Este comando ejecutará un script que creará las tablas automáticamente, si ocurre algún error revise la configuración del paso anterior o contacte con el autor de la aplicación.

***4.3 Ejecutar el proyecto del backend***

Ya creadas las tablas deberá acceder desde una terminal a la carpeta 'test-server' y ejecutar el siguiente comando:

~~~
npm start
~~~

Este comando ejecutará la API en 'localhost' en el puerto 4000, si desea usar otro puerto basta con cambiarlo en el archivo 'test-server/.env' en el campo 'PORT' (no confundir con DB_PORT).

***
**5. Iniciar proyecto del cliente**
Antes de ejecutar algún comando para iniciar el proyecto del frontend deberá acceder al archivo 'test-client/.env' y asegurarse que la variable 'API_HOST' coincida con el entorno donde el backend se está ejecutando.

Luego para ejecutar el frontend deberá acceder desde una terminal a la carpeta 'test-client' y ejecutar el siguiente comando:

~~~
npm start
~~~
Esto iniciará una aplicación en react en el puerto 3000, la cual se conectará con el backend de la aplicación.
