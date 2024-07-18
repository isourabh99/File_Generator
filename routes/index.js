var express = require('express');
var router = express.Router();
const path = require("path")
const fs = require("fs");
const { log } = require('util');

/* GET home page. */
router.get('/', function (req, res, next) {
  // to read the files inside directory 
  try {
    var dirPath = path.join(__dirname, "..", "public", "uploads");
    var files = fs.readdirSync(dirPath);
    var dirLength = files.length;
    var filePath = path.join(__dirname, "..", "public", "uploads", req.params.filename);
    var readData = fs.readFileSync(filePath, "utf-8")
  } catch (error) {
    console.log(error.message)
  }
  
  res.render('index', {
    title: 'TASK-3',
    files,
    dirLength,
    readData,
    filename:"No file selected"
  });
});

// GET dynamic route to delete the particular file 
router.get("/delete/:filename", (req, res, next) => {
  try {
    var filePath = path.join(__dirname, "..", "public", "uploads", req.params.filename);
    fs.unlinkSync(filePath)
  } catch (error) {
    console.log(error.message)
  }
  res.redirect("/")
})

//get dynamic route to read the particular file
router.get("/:filename", (req, res, next) => {
  try {
    var filePath = path.join(__dirname, "..", "public", "uploads", req.params.filename);
    var readData = fs.readFileSync(filePath, "utf-8")
    var dirPath = path.join(__dirname, "..", "public", "uploads");
    var files = fs.readdirSync(dirPath);
    var dirLength = files.length;
  } catch (error) {
    console.log(error.message)
  }
  res.render('index', {
    title: 'FILE Generator',
    files,
    dirLength,
    readData,
    filename:req.params.filename

  });
})

// POST create route to post files inside upload folder
router.post("/create", (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "..", "public", "uploads", req.body.fileName);
    const fileContent = req.body.fileContent;
    fs.writeFileSync(filePath, fileContent);
  } catch (error) {
    console.log(error.message)
  }
  res.redirect(`/${req.body.fileName}`)
})

// POST /update/:filename route to update and save the file 
router.post("/update/:filename",(req,res,next)=>{
try {
  var updatefilePath = path.join(__dirname, "..", "public", "uploads", req.params.filename)
  fs.writeFileSync(updatefilePath, req.body.read)
} catch (error) {
  console.log(error.message)
}
res.redirect(`/${req.params.filename}`)
})
















module.exports = router;