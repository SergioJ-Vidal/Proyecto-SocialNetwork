const express = require("express");

require("dotenv").config();

const swaggerUI = require('swagger-ui-express')

const docs = require('./docs/index')

const app = express();
const cors = require ("cors")

const PORT = process.env.PORT || 3002;

const { typeError } = require("./middleware/errors");
const { dbConnection } = require("./config/config")

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))

app.use('/comments', require('./routes/comments'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

dbConnection()

app.use(typeError)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));