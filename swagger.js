const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.js"]; //apontando a rota

const doc = {
  info: {
    title: "OrderAPI",
    description: "API REST para gerenciamento de pedidos"
  },
  tags: [
    {
      name: "Orders",
      description: "Operações relacionadas a pedidos"
    }
  ],
  servers: [
    {
      url: "http://localhost:3000"
    }
  ]
};

swaggerAutogen(outputFile, endpointsFiles, doc);