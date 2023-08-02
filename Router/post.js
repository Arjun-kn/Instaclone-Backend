let express = require("express");
let Post = require("../model/schema");
let app = express.Router();
let multer = require("multer");
let path = require("path");
//..........................................

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
});

//..........................................................
app.get("/post", (req, res) => {
  let userdata = req.query; // Use req.query to retrieve the filter parameters

  Post.find(userdata)
    .then((records) => {
      if (records.length > 0) {
        res.status(200).json({
          status: "success",
          message: "Data fetched successfully",
          data: records,
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "Data not found",
          data: [],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "You have not posted any post",
      });
    });
});

//...............................................
app.post("/userpost", upload.single("file"), (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-CA");

  let newPost = new Post({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    PostImage: req.file.filename,
    date: currentDate,
  });

  newPost
    .save()
    .then((record) => {
      res.status(200).json({
        status: "Success",
        message: "data post successfully",
        data: record,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({
          status: "Failure",
          message: "Duplicate name. Name must be unique.",
        });
      } else {
        res.status(500).json({
          status: "Failure",
          message: "Something went wrong",
        });
      }
    });
});

module.exports = app;
