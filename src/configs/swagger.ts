import swaggerJSdoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import express, { Express } from "express"

const options:swaggerJSdoc.Options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'law backend',
            version:'1.0.0',
            description:'API documentation for then law backend'
        },
        servers:[
            {
                url:'http://localhost:4000',
            },
        ],
    },
    apis:["./src/routes/*.ts"]
}

const swaggerDocs = swaggerJSdoc(options)

export const setupSwagger = (app: Express) => {
    app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
    console.log('Docs available at http://localhost:4000/api-docs')
    
}