const { prisma } = require("../utils/prisma");
const { verifyPassword } = require("../utils/hashing");
const { createToken } = require("../utils/jwt");
module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }
    const token = createToken({
      id: user.id,
      type: user.type,
    });
    res.json({
      success: true,
      token,
    });
  },
  async profile(req, res) {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      omit: {
        password: true,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const permissionValues = [];
    user.userRoles.forEach(({ role }) => {
      role.rolePermissions.forEach(({ permission }) => {
        if (!permissionValues.includes(permission)) {
          permissionValues.push(permission.name);
        }
      });
    });
    delete user.userRoles;
    res.json({
      data: { ...user, permissions: permissionValues },
    });
  },
};
