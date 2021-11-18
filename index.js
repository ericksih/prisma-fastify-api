// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// get all users
fastify.get(`/users`, async (req, rep) => {
  const users = await prisma.user.findMany();
  return users;
});

// register user
fastify.post("/register", async (req, res) => {
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
});

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
