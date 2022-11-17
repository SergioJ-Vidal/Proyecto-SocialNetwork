module.exports = {

    components: {

        schemas: {

            Post: {

                type: 'object',

                properties: {

                    _id: {

                        type: 'objectId',

                        description: "Post Número Identificador",

                        example: "6201064b0028de7866e2b2c4"

                    },

                    title: {

                        type: 'string',

                        description: "Título del post",

                        example: "Angeles y demonios"

                    },

                    body: {

                        type: "string",

                        description: "El cuerpo del post",

                        example: "Los ángeles y los demonios....bla,bla,bla"

                    },

                    userId: {

                        type: 'objectId',

                        description: "Usuario número identificador",

                        example: "6201064b0028de7866e2b2c4"

                    },

                    comments: {

                        type: 'array',

                        description: "Comentario Número Identificador",

                        example: '[6201064b0028de7866e2b2c4, 6201064b0028de7866e2b2c4 ]'

                    },

                    likes: {

                        type: 'array',

                        items: {$ref: '#/components/schemas/_id'},

                        description: "Comentario Número Identificador",

                        example: "[6201064b0028de7866e2b2c4, 6201064b0028de7866e2b2c4 ]"

                    },

                }

            },

            _id:{

                type:'objectId',
                
                description:"Id de los Posts",
                
                example: "6201064b0028de7866e2b2c4"
                
                },

        }

    }

}