import { PrismaClient } from "@prisma/client";
import dashify from 'dashify'

const prisma = new PrismaClient();

export default async (req, res) => {
   const movieId = req.query.id;
   const {
      title,
      year,
      description,
   } = req.body;
   const slug = dashify(title);
   const updateMovie = await prisma.movie.update({

      where: { id: Number(movieId) },
      data: { 
         title,
         year,
         description,
         slug
       },
   })
  res.json(updateMovie);
};