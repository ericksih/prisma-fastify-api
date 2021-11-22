const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get All Users
const getUsers = async (request, reply) => {
  const users = await prisma.user.findMany();
  reply.send(users);
};

// create a user
const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send({
      error: "Please provide name and email", // 400 bad request error
    });
  }

  const userExists = await prisma.user.findUnique({
    // check if user exists
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).send({
      error: "User already exists",
    });
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return res.send(user);
};

// Get user by ID
const getUser = async (req, res) => {
  const users = await prisma.user.findMany();

  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).send({
      error: "User not found",
    });
  }

  return res.send(user);
};

module.exports = { getUsers, createUser, getUser };
