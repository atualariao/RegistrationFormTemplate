import axios from 'axios';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NavComponent from '../../components/NavComponent';
import { Typography, Container, Box, Link } from '@mui/material';

const ProfilePage = ({users}) => {
  const router = useRouter()

  const Logout = async () => {
    try {
      const user = await axios.get('/api/logout');
      router.push('/Login');
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
  <div>
    <NavComponent />
    <Container component="main" maxWidth="xs" sx={{border: '1px solid grey', mt: 25, mb: 25}}>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                        <Typography component="h1" variant="h5" sx={{mb: 2}}>
                          Profile Page
                        </Typography>
                        <Typography component="h1" variant="h6" sx={{mb: 2}}>
                          {users?.map((per) => (
                            <div key={per.id}>
                                <Link sx={{ textDecoration: 'none' }} href={`/Profile/${per.id}`}>{per.username}</Link>
                            </div>
                          ))}
                        </Typography>
                    </Box>
                </Container>
      <button onClick={Logout}>Logout</button>
  </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  let users = null;
  
  if (cookies?.UserJWT) {
    try {
      const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData`);
      users = data;
    } catch (e) {
      console.log(e);
    }
  }

  if ((cookies?.LoginStatus === "false" || !cookies?.LoginStatus) || !cookies?.UserJWT) {
    return {
      redirect: {
        permanent: false,
        destination: '/Login'
      }
    }
  }

  return {
    props: {
      users,
    }
  }
}

export default ProfilePage;