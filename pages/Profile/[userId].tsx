import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import nookies from 'nookies';

const userId = ({users, userId}) => {
    return (
        <>
            <h1>User number: {userId}</h1>
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
        </>
    );
};

export const  getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    const { params } = ctx
    const { userId } = params

    let users = null;
    if (cookies?.jwt) {
        try {
          const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData?id=${userId}`);
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
            users,
            userId,
        }
    }
}

export default userId;