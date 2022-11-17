# Backend Social Network 💻

Este proyecto consiste en el backend de una red social en la cual consta de usuarios, posts y comentarios dentro de los posts.
A parte, se puede seguir a otro usuario y valorar tanto los posts como los comentarios con "me gusta". Todo se almacena usando mongodb. 

## Tecnologías 🛠

- NodeJS con el framework Express para desarrollar nuestra API.

![image](/assets/indexjs.png)

- MondoDB usando Mongoose para crea una conexión entre MongoDB y el entorno de tiempo de ejecución de JavaScript de Node.js.

![image](/assets/Mongoose.png)

- Bcrypt para hacer hash a las contraseñas de los usuarios y JWT para verificarlos.

![image](/assets/bcrypt.png)

![image](/assets/jwt.png)

- Nodemailer que servirá para enviar correos y que los usuarios confirmen su registro.

![image](/assets/nodemailer.png)

![image](/assets/correo.png)

- Vercel para mantener el backend en producción y poder probar los endpoints usando este enlance https://proyecto-social-network.vercel.app/

![image](/assets/Vercel.png)

## Principales categorías y Endpoints 🔨

Los endpoints se encuentran definidos en las carpetas de routes y controller así como en la de models, la primera indica la url necesaria para acceder, la segunda lo que ocurre al accedera esa url (lógica) y la tercera da forma a estos endpoints en la base de datos al crear unos modelos donde se envía la información y se almacena.

![image](/assets/models.png)

- Usuarios: /users

Dentro de usuarios podremos crear, actualizar, borrar, buscar y demás funcionalidades como buscar usuarios y sus posts relacionados o seguir a otros usuarios.

![image](/assets/usercontroller.png)

![image](/assets/userrouter.png)

- Posts: /posts

En cuanto a los posts a parte del CRUD dar "me gusta" a los posts y encontrarlos por su ID o título.

![image](/assets/postcontroller.png)

![image](/assets/postsroutes.png)

- Comentarios: /comments

Por último los comentarios tienen su CRUD, un sistema de "me gusta" y así como un filtro para buscarlos.

![image](/assets/commentcontroler.png)

![image](/assets/commentroute.png)

- Middlewares

Se han implementado varios middlewares dentro de authentication.js que comprueban la autoría del post y el comentario en caso de querer modificarlo, otro para exigir al usuario haber hecho login para realizar la gran mayoría de enpoints y un último para limitar acciones solo a usuarios con el rol de administradores.

![image](/assets/authen.png)

En errors.js hay un middleware para filtar los errores y que se reconozcan mejor.

![image](/assets/error.png)

## Contacto 📖

<a href = "mailto:juanvidal.sergio@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
    <a href="https://www.linkedin.com/in/sergio-juan-vidal-2640ba256/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 



