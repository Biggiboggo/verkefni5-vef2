import type { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = ({ data, id, li }) => {
    const [register, setRegister] = useState( [] );
    const [event, setEvent] = useState( [] );
    const [registrations, setRegistrations] = useState( [] );
    var registered = true;
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(localStorage.getItem('name'));
        for(var i = 0; i < data.registrations.length; i++) {
            if(data.registrations[i].id == localStorage.getItem('id')) {
                setRegister(true);
            }
            else {
                setRegister(false);
            }
        }
    }, [data.registrations]);


    const registerUser = async event => {
        event.preventDefault();

        const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}/register`,
        {   
            body: JSON.stringify({
                comment: event.target.comment.value,
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'POST'
        })
        setRegister(true);
        const result = await res.json()
        router.reload();
    }

    const unregisterUser = async event => {
        event.preventDefault();
        const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}/register`,
        {
            body: JSON.stringify({  
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'

            },
            method: 'DELETE'
        })
        setRegister(true);
        const result = await res.json() 
        router.reload();
    }


    if(data.registrations.length === 0) {
        registered = false;
    }
    return (
        <>
            <section>
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p> 
                </div>
                <div>
                    <h2>Skráningar á viðburð</h2>
                    {data.registrations.map((reg, i) => (
                        <div key={i}>
                            <ul>
                                <li>
                                    <span>
                                        {reg.name}
                                    </span> 
                                    <br>
                                    </br>
                                    <span>
                                        {reg.comment}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div>
                    {!register ? (
                        <div>
                            {username ? (
                            <div>
                                <h2>Skráðu þig</h2>
                                <form onSubmit={registerUser}>
                                    <div>
                                        <label>Athugasemd:</label><br></br>
                                        <input type='text' name='comment' id='comment'></input>
                                    </div>
                                    <button type='submit'>Skrá mig</button>
                                </form>
                            </div>
                            ) : (
                            <div>
                                <p>Skráðu þig inn til að skrá á viðburð</p>
                            </div>
                            )} 
                        </div>
                    ) : (
                        <div>
                            <p>Þú hefur skráð þig á þennan viðburð</p>
                            <button onClick={unregisterUser}>Afskrá mig</button>
                        </div>
                    )}
                </div>
                <div>
                    <Link href="/">Til baka</Link>
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
    const id = context.params?.event ?? 0;
    const li = true;
    const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}`);
    const data = await res.json()
    if (!data) {
        return {
          notFound: true,
          props: {},
        }
    }
    return {
      props: { data, id, li }, // will be passed to the page component as props
    }
  }
  
export default Home;