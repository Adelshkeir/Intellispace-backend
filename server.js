import express from "express";
import dotenv from "dotenv";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cors from "cors";
import reviewRouter from "./routes/reviewRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import orderitemRouter from "./routes/orderItemRoutes.js";
const app = express();
dotenv.config();

//This middleware is responsible for parsing the JSON data in the request body and making it available in req.body.
app.use(express.json());

//cors middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//multer file usage
app.use("/uploads", express.static("uploads"));

// app usages
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/review", reviewRouter);
app.use("/order", orderRouter);
app.use("/orderitem", orderitemRouter);

const PORT = process.env.PORT || 3000; // in case the port in the .env is not working connect to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
