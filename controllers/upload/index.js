const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');
const fs = require("fs");
const ip = require("ip")
const uploadImage = async(req, res, next) => {
    const imagePath = path.join(__dirname, '../../public/images/products');
    if (!fs.existsSync(imagePath)){
        fs.mkdirSync(imagePath, { recursive: true });
    }
    if (!req.file) {
      return res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await save(req.file.buffer, req.file.originalname, imagePath);
    return res.status(200).json({ name: filename, url: `http://${ip.address()}:3000/public/images/products/${filename}` });
}

const save = async(buffer, filename, folder) => {
    console.log("reached here: ", filename, folder)
    const filenameParts = filename.split(".");
    const extension = filenameParts[filenameParts.length - 1];
    const savedFilename = `${uuid.v4()}.${extension}`
    const filepath = await path.resolve(`${folder}/${savedFilename}`)

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return savedFilename;
}

module.exports = {
    uploadImage,
}