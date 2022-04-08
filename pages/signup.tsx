import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

const Home: NextPage = () => {
    const [signupconfirmed, setSignupconfirmed] = useState(false);
    const signupUser = async event => {
        event.preventDefault();
        const res = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/users/register',
        {
            body: JSON.stringify({
                name: event.target.name.value,
                username: event.target.username.value,
                password: event.target.password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json();
        
        setSignupconfirmed(true);
    }
    return (
        <>
            <div>
                <h1>Nýskráning</h1>
                <div>
                    {signupconfirmed ? (
                        <p>Nýskráning tókst</p>
                    ) : (
                        <div>
                            <form onSubmit={signupUser}>
                                <div>
                                    <label>Nafn:</label>
                                    <input type='text' name='name' id="name"></input>
                                </div>
                                <div>
                                    <label>Notendanafn:</label>
                                    <input type='text' name='username' id="username"></input>
                                </div>
                                <div>
                                    <label>Lykilorð:</label>
                                    <input type='password' name='password' id='password'></input>
                                </div>
                                <button>Skrá</button>
                            </form>
                        </div>
                    )}
                </div>
                <div>
                    <Link href="/">Forsíða</Link><br></br>
                    <Link href="/login">Innskráning</Link><br></br>
                    <Link href="/signup">Nýskráning</Link>
                </div>
            </div> 
        </>
    )
}

export default Home;