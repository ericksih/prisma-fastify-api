// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Register the plugin with options (optional)
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs", // required only if you are planning to call your swagger file from a different route than /swagger
  swagger: {
    info: { title: "Fastify-API" }, // required basic info for swagger
  },
});

fastify.register(require("./routes/users")); // Start the server

// Run the server!
const start = async () => {
  try {
    await fastify.listen(5000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
