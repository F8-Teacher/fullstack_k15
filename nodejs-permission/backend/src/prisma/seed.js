const { prisma } = require("../utils/prisma");
const { hashPassword } = require("../utils/hashing");
const main = async () => {
  await prisma.user.create({
    data: {
      name: "Hoang An",
      email: "hoangan.web@gmail.com",
      password: hashPassword("123456"),
    },
  });
};
main().finally(() => {
  console.log("ok");
  process.exit();
});
