const express = require("express");
const PORT = 3000;
const path = require("path");
//add cors
const cors = require("cors");

//routes
//index routes
const indexRouter = require("./routes/index");
//products routes
const productsRouter = require("./routes/products");
//customers routes
const customersRouter = require("./routes/customers");
//sales routes
const salesRouter = require("./routes/sales");

const app = express();

app.use(cors());

//url encoded to get data from form
app.use(express.urlencoded({ extended: false }));

//add views folder
app.use(express.static(path.join(__dirname, "views")));
//add public folder to project
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname,"./node_modules/bootstrap/dist/css")))

//use routes
app.use("/", indexRouter);
//products routes
app.use("/products", productsRouter);
//customer routes
app.use("/customers", customersRouter);
//sales routes
app.use("/sales", salesRouter);

//listen port
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

module.exports = app;
