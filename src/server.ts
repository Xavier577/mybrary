import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import indexRouter from "./routes";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", indexRouter);

const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.listen(PORT as number, hostname, () =>
  console.log(`listening on http://${hostname}:${PORT}`)
);
