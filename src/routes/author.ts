import express from "express";
import Author from "../models/author";

const authorRouter = express.Router();

// All author Route
authorRouter.get("/", (_req, res) => {
  res.render("authors/index");
});

// New Author Route
authorRouter.get("/new", (_req, res) => {
  res.render("authors/new", { author: new Author() });
});

authorRouter.post("/", (_req, res) => {
  if (_req.body.name !== "") {
    const author = new Author({
      name: _req.body.name,
    });
    author.save((err, _newAuthor) => {
      if (err) {
        res.render("authors/new", {
          author: author,
          errorMessage: "Error creating Author",
        });
      } else {
        //  res.redirect(`authors/${newAuthor.id}`)
        res.redirect("authors");
      }
    });
  } else {
    res.render("authors/new", {
      errorMessage: "Field cannot be empty",
    });
  }
});

export default authorRouter;
