const { getUsers, createUser, getUser } = require("../controllers/users");
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

const getUserByIdRoutes = {
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
  handler: getUser,
};

function userRoutes(fastify, options, next) {
  // Get all users
  fastify.get("/users", getUserRoutes);

  // register user
  fastify.post("/user/register", createUserRoutes);

  fastify.get("/user/:id", getUserByIdRoutes);

  next();
}

module.exports = userRoutes;
