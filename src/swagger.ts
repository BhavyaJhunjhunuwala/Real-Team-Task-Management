import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Team Task Management API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // Add YAML comments in routes for docs
};

export default () => swaggerJsdoc(options);


