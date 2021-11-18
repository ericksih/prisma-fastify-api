const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (request, reply) => {
  const users = await prisma.user.findMany();
  reply.send(users);
};

module.exports = { getUsers };
