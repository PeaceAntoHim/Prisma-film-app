import dashify from 'dashify';
const prisma = new PrismaClient();
import {PrismaClient} from '@prisma/client'

/* This method to made api and then get in index async function */

export default async(req, res) => {
    const base64js = require('base64-js')

    const data = JSON.parse(req.body)
    data.slug = dashify(data.title)
    data.pictures = base64js.byteLength(Buffer.toArray(data.pictures))

    const createdMovie = await prisma.movie.create({
        data,
    })

    res.json(createdMovie)

    
}

// const dataP = await new Promise((resolve, reject) => {
//     const form = new IncomingForm();
//     form.parse(req, (files) => {
//         if (err) return reject(err);
//         resolve({ files });
//     });
// });

// const createdPicture = await prisma.movie.create({
//    imagePath: dataP.files.picture.path,
// })
// res.json(createdPicture)

// try {
//     const imageFile = dataP.files.image; // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
//     const imagePath = imageFile.filepath;
//     const imagename = imageFile.originalFilename
//     //console.log(imageFile.originalFilename)
//     const pathToWriteImage = 'public/'+imagename; // include name and .extention, you can get the name from data.files.image object
//     const image = await fs.readFile(imagePath);
//     await fs.writeFile(pathToWriteImage, image);
//     //store path in DB
//     res.status(200).json({ message: 'image uploaded!'});
// } catch (error) {
//     res.status(500).json({ message: error.message });
//     return;
// }
