import Head from "next/head";
const prisma = new PrismaClient();
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import styles from "../../styles/Home.module.css";

export default function Detail({ movie }) {
    const router = useRouter();

    async function deleteMovie() {
        // e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/delete/${movie.id}`, {
          method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        })
        
        router.push('/show')
        return await response.json()
      }
    return(
        <div className={styles.container}>
            <Head>
                <title>{ movie.title }</title>
                <link rel="stylesheet" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h2>{ movie.title }</h2>
                <span>{movie.year}</span>
                <p>{ movie.description }</p>
                <br/><br/>
                <a onClick={deleteMovie}>Delete this film</a>
            </main>
        </div>
    );
}

/* async function to get slug view */
export async function getServerSideProps(context) {

    const {slug} = context.query;

    const movie = await prisma.movie.findFirst({
        where: {
            slug: slug
        }
    })

    return {
        props: {
            movie
        }
    }
}
