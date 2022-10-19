import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import nookies from 'nookies';

const userId = ({users, userId}) => {
    return (
        <>
            <h1>User with the id {userId}</h1>
                {
                    users?.map((user) => (
                        <div key={user.id}>
                            <h2>
                            {user.id} {user.username}
                            </h2>
                            <p>{user.firstName}</p>
                            <p>{user.middleName}</p>
                            <p>{user.lastName}</p>
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