import React from 'react';
import RegisterComponent from '../components/RegisterComponent';
import nookies from 'nookies';
import axios from 'axios';

const register = () => {
    return (
        <div>
            <RegisterComponent />
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    let user = null;
  
    if (cookies?.jwt) {
      try {
        const { data } = await axios.get('https://634ccfadf5d2cc648e950444.mockapi.io/userData', {
          headers: {
            Authorization:
              `Bearer ${cookies.jwt}`,
            },
        });
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
export default register;