module.exports = (req, res, next) => {
  const { userId, userType } = req;
  if (userType === "CUSTOMER") {
    return res.status(403).json({
      success: false,
      message: "Từ chối truy cập",
    });
  }
  //Xử lý chia nhỏ quyền
  next();
};
