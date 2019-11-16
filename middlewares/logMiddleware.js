const childProcess = require('child_process');


const logMiddleware = (req, res, next) => {
    const whatToLog = req.method + ' ' + req.path

    console.log(whatToLog);

    childProcess.execSync(`echo ${whatToLog} >> requests.log`);
    next()
};




module.exports = logMiddleware