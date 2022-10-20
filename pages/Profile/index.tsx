import axios from 'axios';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { User } from '../../utils/ObjectTypes';

const ProfilePage = (users:User) => {

  return (
  <div>
    <h2>User List</h2>
      {users?.map((per) => (
        <div>
            <a href={`/Profile/${per.id}`} key={per.id}>{per.username}</a>
        </div>
      ))}
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

  if (!users || !cookies) {
    return {
      redirect: {
        permanent: false,
        destination: '/HomePage'
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