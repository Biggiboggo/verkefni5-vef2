import type { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = ({ data }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    useEffect(() => {
       setUsername(localStorage.getItem('name')); 
    }, []);
    
    return (
        <>
            <section>
                <h2>Viðburðir á næstunni</h2>
                
                <div>
                {data.items.map((event, i) => (
                    <div key={i}>
                        <ul >
                            <li>
                                <Link href={ '/' + event.id }>{event.name}</Link>
                                <p>{event.description}</p>
                            </li>
                        </ul>
                    </div>
                ))}
                </div>
                <div>
                    {username ? (
                        <div>
                            <div>
                            <p>Skráður inn sem <b>{username}</b></p>
                            <button onClick={(e) => { localStorage.clear(); router.reload() }}>Útskrá</button>
                            </div>
                            <div>
                                <Link href="/">Forsíða</Link><br></br>
                            </div>
                        </div>
                        
                    ) : (
                        <div>
                            <Link href="/">Forsíða</Link><br></br>
                            <Link href="/login">Innskráning</Link><br></br>
                            <Link href="/signup">Nýskráning</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
    //const li = true;
    const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/`);
    const data = await res.json()
    if (!data) {
        return {
          notFound: true,
        }
    }
    
    return {
      props: { data }, // will be passed to the page component as props
    }
  }

export default Home;

