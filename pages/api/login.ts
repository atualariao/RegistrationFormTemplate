import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies'
import { sign } from 'jsonwebtoken';

const secret = process.env.SECRET;

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const { username } = req.body;

  try {
    const token = sign(
      {
        exp:Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
        username: username,
      },
      secret
    );

    setCookie({ res }, 'UserJWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    setCookie({ res }, 'LoginStatus', "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(200).end();
  }
   catch (e) {
    res.status(400).send(e);
  }
}


// import { NextApiRequest, NextApiResponse } from 'next';
// import { setCookie } from 'nookies'
// import { sign } from 'jsonwebtoken';
// import { withIronSessionApiRoute } from "iron-session/next";

// const secret = process.env.SECRET;

// export default withIronSessionApiRoute(
//   async function loginRoute(req:NextApiRequest, res:NextApiResponse) {
//     const { username } = req.body;

//     await req.session.save();
//     res.send({ ok: true });
//     try {
//     const token = sign(
//       {
//         exp:Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
//         username: username,
//       },
//       secret
//     );

//     setCookie({ res }, 'UserJWT', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== 'development',
//       maxAge: 30 * 24 * 60 * 60,
//       path: '/',
//     });

//     setCookie({ res }, 'LoginStatus', "true", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== 'development',
//       maxAge: 30 * 24 * 60 * 60,
//       path: '/',
//     });

//     res.status(200).end();
//   }
//    catch (e) {
//     res.status(400).send(e);
//   }
//   },
//   {
//     cookieName: "user_session",
//     password: "complex_password_at_least_32_characters_long",
//     // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//     cookieOptions: {
//       secure: process.env.NODE_ENV !== 'development',
//     },
//   },
// );


