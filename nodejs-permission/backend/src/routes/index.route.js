const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/admin/dashboard.controller");
const userController = require("../controllers/admin/user.controller");
const productController = require("../controllers/admin/product.controller");
const orderController = require("../controllers/admin/order.controller");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const roleController = require("../controllers/admin/role.controller");
const permissionMiddleware = require("../middlewares/permission.middleware");

router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.profile);
router.use(authMiddleware, adminMiddleware);
router.get("/admin/dashboard", dashboardController.index);
router.get(
  "/admin/users",
  permissionMiddleware("users.list"),
  userController.index,
);
router.get(
  "/admin/products",
  permissionMiddleware("products.list"),
  productController.index,
);
router.get(
  "/admin/orders",
  permissionMiddleware("orders.list"),
  orderController.index,
);

router.use(permissionMiddleware("ADMIN"));
router.get("/admin/roles", roleController.index);
router.post("/admin/roles", roleController.create);
router.put("/admin/roles/:id", roleController.update);
router.delete("/admin/roles/:id", roleController.delete);
router.put("/admin/roles/:id/users", roleController.assignUser);
module.exports = router;
