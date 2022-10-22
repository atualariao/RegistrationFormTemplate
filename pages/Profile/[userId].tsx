import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import nookies from 'nookies';
import NavComponent from '../../components/NavComponent';
import { Typography, Container, Box, Link } from '@mui/material';

const userId = ({users, userId}) => {
    return (
        <>
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
                User number: {userId}
                </Typography>
                <Typography component="h1" variant="h6" sx={{mb: 2}}>
                  {
                    users?.map((user) => (
                      <div key={user.id}>
                          <h3>Username: <b>{user.username}</b></h3>
                          <p>First Name: <b>{user.firstName}</b></p>
                          <p>Middle Name: <b>{user.middleName || 'N/A'} </b></p>
                          <p>Last Name: <b>{user.lastName}</b></p>
                          <p>Email: <b>{user.email}</b></p>
                          <p>Contact: <b>{user.mobilenum}</b></p>
                          <hr />
                      </div>
                    ))
                  }
                </Typography>
            </Box>
            </Container>
        </>
    );
};

export const  getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    const { params } = ctx
    const { userId } = params
    console.log(userId)

    let users = null;
    if (cookies?.UserJWT) {
        try {
          const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData?id=${userId}`);
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
            userId,
        }
    }
}

export default userId;