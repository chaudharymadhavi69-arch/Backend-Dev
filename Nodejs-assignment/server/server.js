// path module ka demo

const path = require("path");

const filePath = path.join("folder", "file.txt");
console.log("joined path:", filePath);

console.log("extension:", path.extname("test.pdf"));
console.log("filename:", path.basename("demo/file.js"));