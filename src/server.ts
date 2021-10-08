import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import indexRouter from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const DATABASE_URI = process.env.DATABASE_URI as string;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")));

mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB!"));

app.use("/", indexRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
