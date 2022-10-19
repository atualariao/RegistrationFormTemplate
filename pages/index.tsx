import { NextPage } from "next";
import HomePage from "./HomePage";
import { GetServerSideProps } from "next";
import nookies from 'nookies';
import axios from 'axios';


const Home: NextPage = () => {   

  return (
    <div>         
      <HomePage users={undefined} />
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let users = null;
  
  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData`); //Make dynamic userId
      users = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (users && cookies) {
    return {
      redirect: {
        permanent: false,
        destination: '/Profile'
      }
    }
  }

  return {
    props: {
      users
    }
  }
}

export default Home