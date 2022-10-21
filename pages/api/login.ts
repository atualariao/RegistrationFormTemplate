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




// import { sign } from 'jsonwebtoken';
// import { serialize } from 'cookie';
// import { NextApiRequest, NextApiResponse } from 'next';

// const secret = process.env.SECRET;

// export default async (req:NextApiRequest, res:NextApiResponse) => {
//   const { username,  } = req.body;

  // const token = sign(
  //   {
  //     exp:Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
  //     username: username,
  //   },
  //   secret
  // );

  // const userCookie = serialize("UserJWT", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development',
  //   sameSite: "strict",
  //   maxAge: 24 * 60 * 60,
  //   path: '/'
  // });

//   const userStatus = serialize("LoginStatus", "true", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development',
//     sameSite: "strict",
//     maxAge: 24 * 60 * 60,
//     path: '/'
//   });

//   res.setHeader('Set-Cookie', [userCookie, userStatus]);
//   res.status(200).json({message: "Success!"})
// }
