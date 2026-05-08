const { prisma } = require("../utils/prisma");
module.exports = (permissionName) => async (req, res, next) => {
  const userId = req.userId;
  const userType = req.userType;
  //Nếu permissionName là ADMIN
  if (userType === "ADMIN") {
    next();
  }
  //Lấy ra roles của users
  //Lấy ra permissions của roles
  //Lọc trùng permissions --> Tạo ra 1 mảng chứa danh sách các permissions
  const user = await prisma.user.findUnique({
    where: {
      id: +userId,
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
  if (!permissionValues.includes(permissionName)) {
    return res.status(403).json({
      success: false,
      message: "Bạn bị cấm truy cập",
    });
  }
  next();
};
