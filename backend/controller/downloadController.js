const fs = require("fs");

// Where fileName is name of the file and response is Node.js Reponse.
exports.getFile = async (req, res) => {
    try {
        const filePath = `../uploads/${req.params}` ; // or any file format
		
        // Check if file specified by the filePath exists
        fs.exists(filePath, function (exists) {
            if (exists) {
                // Content-type is very interesting part that guarantee that
                // Web browser will handle response in an appropriate manner.
                res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + fileName,
                });
                fs.createReadStream(filePath).pipe(res);
                return;
            }
			res.writeHead(400, { "Content-Type": "text/plain" });
			console.log("responseIs:"+res);
			res.download(filePath);
            res.end("ERROR File does not exist");
        });
    } catch (err) {}
};
