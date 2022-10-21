import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import axios from 'axios';
import { Tabs, Tab, useMediaQuery, useTheme, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DrawerComponent from './DrawerComponent';

const pages = ['HomePage', 'Contact'];
const NavComponent = () => {
    const [value, setValue] = useState(0);
    const router = useRouter()
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));


    const Login = async () => {
        router.push('/Login')
    }
    const Register = async () => {
        router.push('/Register')
    }

    return (
      <AppBar>
        <Toolbar>
        {
            isMatch ? (
                <>
                    <DrawerComponent />
                </>
            ) : (
                <>
            <Tabs  textColor='inherit' value={value} onChange={(e, value) => setValue(value)} indicatorColor='primary' >
                {
                    pages.map((page, index) => (
                        <Tab key={index} label={page} href={page}  />
                    ))
                }
                <Tab label='Profile' href='/Profile' />
          </Tabs>
          {/* <Button  sx={{marginLeft: 'auto'}} color="inherit" onClick={Logout} >Logout</Button> */}
          <Button  sx={{marginLeft: 'auto'}} color="inherit" onClick={Login} >Login</Button>
          <Button sx={{marginLeft: '10px'}} color="inherit" onClick={Register} >Register</Button>
                </>
            )
        }
        </Toolbar>
      </AppBar>
    );
};

// export const getServerSideProps: GetServerSideProps = async(ctx) => {
//     const cookies = nookies.get(ctx)
//     const { params } = ctx

//     let users = null;

//     if (cookies?.UserJWT) {
//         try {
//           const { data } = await axios.get(`https://634ccfadf5d2cc648e950444.mockapi.io/userData`);
//           users = data;
//         } catch (e) {
//           console.log(e);
//         }
//       }

//       if ((cookies?.LoginStatus === "false" || !cookies?.LoginStatus) || !cookies?.UserJWT) {
//         return {
//           redirect: {
//             permanent: false,
//             destination: '/Login'
//           }
//         }
//       }

//     return {
//         props: {
//             users
//         }
//     }
// }

export default NavComponent;