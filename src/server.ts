import authorRouter from "./routes/author";
import dotenv from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import indexRouter from "./routes";
import mongoose from "mongoose";
import path from "path";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const DATABASE_URI = process.env.DATABASE_URI as string;

// set configurations for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.use(express.static(path.join(__dirname, "..", "public")));

// connect to database
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB!"));

// connect various routes to app
app.use("/", indexRouter);
app.use("/authors", authorRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
