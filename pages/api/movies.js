import dashify from 'dashify';
const prisma = new PrismaClient();
import {PrismaClient} from '@prisma/client'

/* This method to made api and then get in index async function */
export default async(req, res) => {
    const data = JSON.parse(req.body)
    data.slug = dashify(data.title)

    const createdMovie = await prisma.movie.create({
        data
    })

    res.json(createdMovie)
}

