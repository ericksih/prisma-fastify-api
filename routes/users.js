const { getUsers, createUser } = require("../controllers/users");

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

const createUserRoutes = {
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
  handler: createUser,
};

function userRoutes(fastify, options, next) {
  // Get all users
  fastify.get("/users", getUserRoutes);

  // register user
  fastify.post("/user/register", createUserRoutes);

  next();
}

module.exports = userRoutes;
