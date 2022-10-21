import { NextApiResponse, NextApiRequest } from 'next';
import { destroyCookie, setCookie } from 'nookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  destroyCookie({ res }, 'UserJWT', {
    path: '/',
  });
  setCookie({ res }, 'LoginStatus', "false", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  res.status(200).end();
}


// import { serialize } from "cookie";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";

// export default async (req:NextApiRequest, res:NextApiResponse) => {
//   const { cookies } = req;
//   const jwt = cookies.UserJWT;

//   if (jwt) {
//     const serialized = serialize("UserJWT", null, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== 'development',
//       sameSite: "strict",
//       maxAge: -1,
//       path: '/'
//     });

//     const userStatus = serialize("LoginStatus", "false", {
//       httpOnly: false,
//       secure: process.env.NODE_ENV !== 'development',
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60,
//       path: '/'
//     });

//     res.setHeader('Set-Cookie', [serialized, userStatus]);
//   } else {
//     return res.json({ message: 'Already logged in.' })
//   }

//   res.status(200).end()
// }