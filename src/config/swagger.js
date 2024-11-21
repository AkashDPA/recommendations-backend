import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recommendations Backend API',
            version: '1.0.0',
            description: 'API documentation for managing user recommendations and collections',
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwaggerDocs;
