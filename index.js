const express = require("express");

const app = express();

const PORT = 8080;

const { typeError } = require("./middleware/errors");
const { dbConnection } = require("./config/config")

app.use(express.json())

app.use('/comments', require('./routes/comments'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

dbConnection()

app.use(typeError)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));