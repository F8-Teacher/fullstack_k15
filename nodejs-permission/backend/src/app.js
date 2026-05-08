require("dotenv/config");
const express = require("express");
const indexRouter = require("./routes/index.route");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/api", indexRouter);
app.listen(PORT, () => {
  console.log("Server đang chạy ở PORT: " + PORT);
});
