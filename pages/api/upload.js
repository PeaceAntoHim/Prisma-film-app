import dashify from 'dashify';
const prisma = new PrismaClient();
import { promises as fs } from 'fs';
import { IncomingForm } from 'formidable';
import {PrismaClient} from '@prisma/client'

// first we need to disable the default body parser

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req, res) => {
        
if (req.method === 'POST') {
    // parse form with a Promise wrapper
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
    
    try {
        const imageFile = data.files.image; // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
        console.log(imageFile);
        const imagePath = imageFile.filepath;
        const imagename = imageFile.originalFilename
        //console.log(imageFile.originalFilename)
        const pathToWriteImage = 'public/'+imagename; // include name and .extention, you can get the name from data.files.image object
        const image = await fs.readFile(imagePath);
        await fs.writeFile(pathToWriteImage, image);
        //store path in DB
        const title = JSON.stringify(data.fields.title);
        const year = data.fields.year;
        const angka = parseInt(year)
        const description = JSON.stringify(data.fields.description);
        const slug = dashify(title);
        const createdData = await prisma.movie.create({
            data: { 
                title: title,
                year: angka,
                description: description,
                slug: slug,
            },
        })
        res.json(createdData);
        res.status(200).json({ message: 'image uploaded!'});
    } catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
};
   
};