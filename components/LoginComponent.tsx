import { NextPage } from "next";
//object types, initialvalues, and regex imports
import { LoginValues } from "../utils/ObjectTypes";
import * as yup from 'yup';
//formik, yup, and react imports
import { useFormik } from 'formik';
import React, { useState } from 'react';
//mui imports
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { LoadingButton } from "@mui/lab";
import { InputAdornment, IconButton, Box, Container, Typography, Collapse, Alert } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from 'axios';
import NavComponent from "./NavComponent";

const LoginPage: NextPage = () => {
    //Message
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    //Show Password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    //Router
    const router = useRouter();
    //formik hook
    const formik = useFormik<LoginValues>({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values: LoginValues) => {
            const res = await axios.get('https://634ccfadf5d2cc648e950444.mockapi.io/userData');
            const data = res.data
            const result = data.filter(user => {
                if (user.username === values.username && user.password === values.password ) {
                    return user
            }})

            if (result.length === 0) {
                setMessage('User does not exist')
                setSubmitted(true)
                setOpen(true)
            } else {
                await axios.post('/api/login', values)
                setLoading(true)
                router.replace('/Profile')
            }

        },
    //Validation
    validationSchema:  yup.object({
    username: yup.string().trim().required('Username is required'),
    password: yup.string().required()})
    });
    
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
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
                {submitted && <Collapse in={open}><Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" 
                onClick={() => {setOpen(false)}}><Close fontSize="inherit" /></IconButton>}>{message}</Alert></Collapse>}
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2}}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    helperText={(formik.errors.username && formik.touched.username) && formik.errors.username}
                    {...formik.getFieldProps('username')}
                    error={formik.touched.username && !!formik.errors.username}
                    size="small"
                    />
                </Grid>
                <Grid xs={12}>
                    <hr></hr>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    helperText={(formik.errors.password && formik.touched.password) && formik.errors.password}
                    {...formik.getFieldProps('password')}
                    error={formik.touched.password && !!formik.errors.password}
                    size="small"
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                    />
                </Grid>
                <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                >
                Sign In
                </LoadingButton>
                <Typography sx={{mb: 2}}>
                    No Account?&nbsp;
                    <Link href={'/Register'}>
                        Sign up here
                    </Link>
                </Typography>
                </Box>
            </Box>
        </Container>
        
    </div>
)}

export default LoginPage