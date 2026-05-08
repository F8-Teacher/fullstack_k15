const { prisma } = require("../../utils/prisma");

module.exports = {
  async index(req, res) {
    const roles = await prisma.role.findMany();
    res.json({
      success: true,
      data: roles,
    });
  },
  async create(req, res) {
    const { name, permissions } = req.body;
    //Thêm name vào bảng role -> lấy roleId
    const role = await prisma.role.create({
      data: {
        name,
      },
    });
    //Thêm permissions vào bảng permissions --> lấy id của từng permissions
    if (permissions.length) {
      const data = await Promise.all(
        permissions.map(async (name) => {
          let permission = await prisma.permission.findFirst({
            where: {
              name,
            },
          });
          if (!permission) {
            permission = await prisma.permission.create({
              data: { name },
            });
          }
          return {
            permissionId: permission.id,
            roleId: role.id,
          };
        }),
      );

      await prisma.rolePermission.createMany({
        data,
      });
    }
    //Thêm roleId và permissionsId vào roles_permissions
    res.json({
      success: true,
      message: "Thêm role thành công",
    });
  },
  async update(req, res) {
    const { name, permissions } = req.body;
    const { id } = req.params;
    const role = await prisma.role.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });
    if (permissions?.length) {
      const data = await Promise.all(
        permissions.map(async (name) => {
          let permission = await prisma.permission.findFirst({
            where: {
              name,
            },
          });
          if (!permission) {
            permission = await prisma.permission.create({
              data: { name },
            });
          }
          return {
            permissionId: permission.id,
            roleId: role.id,
          };
        }),
      );

      await prisma.rolePermission.deleteMany({
        where: { roleId: +id },
      });
      await prisma.rolePermission.createMany({
        data,
      });
    }
    res.json({
      success: true,
      message: "Cập nhật role thành công",
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    await prisma.rolePermission.deleteMany({
      where: {
        roleId: +id,
      },
    });
    await prisma.role.delete({
      where: {
        id: +id,
      },
    });
    res.json({
      success: true,
      message: "Xóa role thành công",
    });
  },
  async assignUser(req, res) {
    const userIds = req.body;
    const { id } = req.params;
    if (Array.isArray(userIds) && userIds.length) {
      await prisma.userRole.createMany({
        data: userIds.map((userId) => ({ roleId: +id, userId })),
      });
    }
    res.json({
      success: true,
    });
  },
};
