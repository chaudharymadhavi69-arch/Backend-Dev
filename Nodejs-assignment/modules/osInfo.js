// system ki info nikal rahe h

const os = require("os");

console.log("platform:", os.platform());
console.log("cpu count:", os.cpus().length);
console.log("total memory:", os.totalmem());
console.log("free memory:", os.freemem());