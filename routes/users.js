const { getUsers } = require("../controllers/users");

const fastify = require("fastify")({ logger: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserRoutes = {
  schema: {
    responese: {
      200: {
        type: "object",
        properties: {
          data: {
            type: "array",
          },
        },
      },
    },
  },
  handler: getUsers,
};

function userRoutes(fastify, options, next) {
  // Get all users
  fastify.get("/users", getUserRoutes);

  next();
}

module.exports = userRoutes;
