import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setCookie } from 'nookies'
import md5 from 'blueimp-md5'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const { username } = req.body;

  try {
    const postRes = await axios.get('https://634ccfadf5d2cc648e950444.mockapi.io/userData')
    
    setCookie({ res }, 'jwt', md5(username), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    res.status(200).end();
  }


      //Cookie login state and attempts

      // setCookie({ res }, 'logged_in', 'yes', {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== 'development',
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: '/',
      // });

      // setCookie({ res }, 'login_attempts', '1', {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== 'development',
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: '/',
      // });

  
   catch (e) {
    res.status(400).send(e);
  }
}