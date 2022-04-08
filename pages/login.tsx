import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    var error401 = false;
    const router = useRouter();
    const loginUser = async event => {
        event.preventDefault();
        const res = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/users/login',
        {
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json()
        localStorage.setItem('token', result.token);
        localStorage.setItem('name', result.user.name);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('id', result.user.id);
        localStorage.setItem('admin', result.user.admin);
        router.push('/');  
    }
    return (
        <>
            <div>
                <h1>Innskráning</h1>
                <form onSubmit={loginUser}>
                    <div>
                        <label>Notendanafn:</label>
                        <input type='text' name='username' id="username"></input>
                    </div>
                    <div>
                        <label>Lykilorð:</label>
                        <input type='password' name='password' id='password'></input>
                    </div>
                    <button type='submit'>Innskrá</button>
                </form> 
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