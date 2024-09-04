const path = require('path');

module.exports = path.dirname(process.mainModule.filename);

//this for the directory name
//process is global variable and then use mainModule property

