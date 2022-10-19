import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';

const ProfilePage = ({users}) => {
  const router = useRouter();

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
    <h2>User List</h2>
    <ul>
      {users.map((per) => (
        <li key={per.id}>{per.username}</li>
      ))}
    </ul>
  </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let users = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData`);
      users = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!users) {
    return {
      redirect: {
        permanent: false,
        destination: '/Login'
      }
    }
  }

  return {
    props: {
      users
    }
  }
}

export default ProfilePage;