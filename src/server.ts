import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import mongoose from "mongoose";
import indexRouter from "./routes";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DATABASE_URL as string;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.resolve("../", "public")));

/* mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Mongoose....")); */

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
