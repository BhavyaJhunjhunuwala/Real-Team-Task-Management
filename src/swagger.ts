
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Router } from "express";

const router = Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real-Time Team Task Management API",
      version: "1.0.0",
      description: "API documentation for your deployed backend on Render",
    },
    servers: [
      {
        url: "https://real-team-task-management-1.onrender.com", // your render URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // path to your route files
};

const specs = swaggerJsdoc(options);

// Export router so you can mount it in your main app
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
