import React from 'react';
import LoginPage from '../components/LoginComponent';
import axios from 'axios';
import nookies from 'nookies';

const Login = () => {
    return (
        <div>
            <LoginPage />
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    let user = null;
  
    if (cookies?.jwt) {
      try {
        const { data } = await axios.get('https://634ccfadf5d2cc648e950444.mockapi.io/userData');
        user = data;
      } catch (e) {
        console.log(e);
      }
    }
  
    if (user && cookies) {
      return {
        redirect: {
          permanent: false,
          destination: '/HomePage'
        }
      }
    }
  
    return {
      props: {}
    }
  }

export default Login;