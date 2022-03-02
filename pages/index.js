import Head from 'next/head'
import Link from 'next/link'
import dashify from 'dashify'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
import styles from '../styles/Home.module.css'

const prisma = new PrismaClient()

export default function Home({ data }) {
    const router = new useRouter()

      /* This variable for input data */
      const [pictureFile, setPictureFile] = useState(null);
      const [formData, setFormData] = useState({})
      const [movies, setMovies] = useState(data)
      /* This async function to define saveMovie */
      async function saveMovie(e) {
        e.preventDefault();
          setMovies([...movies, formData])
          /* set movies distructuring */
         try {
          const response = await fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = await response.json();
          if (!response.ok) {
              throw new Error(data.message);
          }
          setPictureFile(null);
        } catch (err) {
          console.error(err.message);
        }

        // router.push('/show')
        try {
          const pictureData = new FormData();
          pictureData.append('image', pictureFile);
          const res = await fetch('/api/upload', {
              method: 'POST',
              body: pictureData,
          })
          const data = await res.json();
          if (!res.ok) {
              throw new Error(data.message);
          }
          setPictureFile(null);
        } catch (err) {
          console.error(err.message);
        }
      };

  /* This for read data */
  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

          {/* This form to input data */}
          <form className={styles.movieform} onSubmit={saveMovie}>
            <input 
              type="text"
              placeholder="Enter the title movie.."
              name="title" 
              onChange={e=> setFormData({ ...formData, title: e.target.value })} 
              required 
            />
            <input 
              type="number" 
              placeholder="Enter the year movie.." 
              name="year" 
              onChange={e=> setFormData({ ...formData, year: +e.target.value })} 
              required 
            />
            <input 
              type="file" 
              placeholder="Enter the year movie.." 
              name="pictures" 
              onChange={e=> setPictureFile(e.target.files[0] )} 
              required 
            />
            <textarea 
              name="description" 
              cols="30" 
              rows="10" 
              placeholder="Enter the description movie.." 
              onChange={e=> setFormData({ ...formData, description: e.target.value })} required 
            />
            <input 
              type="text" 
              placeholder="Enter the slug.." 
              name="slug" 
              value={dashify(formData.title ?? "")}
              disabled
              required 
            />
            <button type="submit">Add New Movie</button>
          <Link href="/show">
            <a>See All Movie</a>
          </Link>
          </form> 

      </main>
    </div>
  )
}

export async function getServerSideProps() {

  const movies = await prisma.movie.findMany()

  return {
    props: {
      data: movies 
    }
  }
}

