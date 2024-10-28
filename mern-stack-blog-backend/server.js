const express = require("express");
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const httpErrors = require("http-errors");
const DB = require("./models/index");
const accountRoute = require("./routes/account.route");
const commentRoute = require("./routes/comment.route");
const postRoute = require('./routes/postRoute');
const categoryRoute = require('./routes/categoryRoute')

require("dotenv").config();

// khoi tao web server bang express
const app = express();

// them cac middleware vao web server
app.use(morgan("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization'
}));

// thuc hien tiep nhan request tu client bang get
app.get("/", async (req, res, next) => {
  res.status(200).json({ message: "Welcome to RESTFul API with NodeJs " });
});

app.use("/account", accountRoute);
app.use("/comment", commentRoute);
app.use('/blog', postRoute);
app.use('/cate', categoryRoute);

// them middleware xu ly loi tren : router , Controller , Model
app.use(async (req, res, next) => {
  //   next(createError(404,'Không tìm thấy trang '));
  next(httpErrors.BadRequest("Bad Request "));
});

// kiem soat loi bat ki trong web server
app.use(async (err, req, res, next) => {
  //lay status code thuc te dang gap phai
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
  });
  //   res.send(err.message)
});

const HOST = process.env.HOST_NAME || "localhost";
const PORT = process.env.PORT || 9999;
app.listen(PORT, HOST, async () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  await DB.connectDB();
});
