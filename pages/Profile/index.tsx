import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';

const ProfilePage = ({user}) => {
  const router = useRouter();
  const { firstName, middleName, lastName, mobilenum, email, username }  = user;

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div>Username: {username}</div>
      <div>First Name: {firstName}</div>
      <div>Middle Name: {middleName}</div>
      <div>Last Name: {lastName}</div>
      <div>Mobile Number: {mobilenum}</div>
      <div>Email: {email}</div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData/1`);
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/Login'
      }
    }
  }

  return {
    props: {
      user
    }
  }
}

export default ProfilePage;