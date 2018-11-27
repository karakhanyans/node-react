exports.uploadPath = '../uploads/';

// Handle file upload
exports.upload = (file, fileName) => {
    file.mv(fileName, function (err) {
        if (err) {
            throw new Error(err);
        }
        return fileName;
    });
};