import axios from 'axios';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';

const ProfilePage = ({users}) => {

  return (
  <div>
    <h2>User List</h2>
    <ul>
      {users.map((per) => (
        <a href={`/Profile/${per.id}`}><li key={per.id}>{per.username}</li></a>
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

  if (!users && !cookies) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
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