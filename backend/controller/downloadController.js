const fs = require("fs");
const { dirname, path, join } = require("path");

// Where fileName is name of the file and response is Node.js Reponse.
const getFile = async (req, res) => {
    console.log(req.params)
    try{
        const fileName = req.params.filename;
        const dirName = join(__dirname,'../..',"uploads",req.params.dirname) ;
        console.log(dirName)
        const filePath = `${dirName}/${fileName}`; // or any file format
        //const filePath = '../../uploads/image'
        // Check if file specified by the filePath exists

        res.sendFile(fileName, {root:dirName}, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', fileName);
            }
        });

    } catch (err) {
        console.log("error encountered", err)
    }
};
module.exports = getFile;