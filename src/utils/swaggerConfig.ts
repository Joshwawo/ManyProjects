import path from 'path'

export const swaggerSpec = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API DOCUMENTATION",
        version: "1.0.0",
        description: "API DOCUMENTATION FOR THE THIS APP",
      },
      servers: [
        {
          url: "http://localhost:3003",
        },
        {
          url: "https://api-projects.up.railway.app",
        },
      ],
    },
    // apis: ["./src/routes/*.ts"],
    apis: [`${path.join(__dirname, "./routes/*.ts")}`],
  };