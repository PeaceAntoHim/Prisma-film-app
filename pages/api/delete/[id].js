import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
   const movieId = req.query.id;
   const deleteMovie = await prisma.movie.delete({
      where: { id: Number(movieId) },
   });
   res.json(deleteMovie);
}