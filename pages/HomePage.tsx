import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';

const HomePage = (props) => {
    const router = useRouter();
    //logout user
    const Logout = async () => {
        try {
          await axios.get('/api/logout');
          router.push('/HomePage');
        } catch (e) {
          console.log(e);
        }
      }

    if (props.user) {
        return (
            <div>
                <h2>Welcome back, {props.user?.username || 'Guest'}!</h2>
                <nav>
                    <ul>
                        <li><button onClick={Logout} >Logout</button></li>
                        {/* <li><Link href={{
                          pathname: `/Profile/${props.user.id}`,
                        }}>Profile</Link></li> */}
                        <li><Link href={'/Profile'}>Profile</Link></li>
                        <li><Link href={'/Contact'}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        );
    } else {
        return (
            <div>
                <h2>This is the Home Page</h2>
                <nav>
                    <ul>
                        <li><Link href={'/Login'}>Login</Link></li>
                        <li><Link href={'/Register'}>Register</Link></li>
                        <li><Link href={'/Contact'}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }

};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    let user = null;
    
    if (cookies?.jwt) {
      try {
        const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData/1`); //Make dynamic userId
        user = data;
      } catch (e) {
        console.log(e);
      }
    }

    return {
      props: {
        user
      }
    }
  }

export default HomePage;