module.exports = {

    paths: {

        "/posts/find": {

            get: {

                tags: {

                    Posts: "Traer Posts",

                },

                description: "Obtener posts",

                operationId: "getPosts",

                parameters: [],

                responses: {

                    200: {

                        description: "Posts obtenidos",

                        content: {

                            "application/json": {

                                schema: {

                                    $ref: "#/components/schemas/Post",

                                },

                            },

                        },

                    },

                },

            },

        },

    },

};