const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (request, reply) => {
  const users = await prisma.user.findMany();
  reply.send(users);
};

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

module.exports = { getUsers, createUser };
