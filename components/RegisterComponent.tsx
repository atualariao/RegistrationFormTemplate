import { NextPage } from "next";
//object types, initialvalues, and regex imports
import { SignUpFormValues, initialValues } from '../utils/ObjectTypes';
import { validationRegisterSchema } from '../components/YupSchema';
//formik, yup, and react imports
import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
//mui imports
import MuiPhoneNumber from 'material-ui-phone-number-2';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { InputAdornment, Alert, Collapse, IconButton, Box, Container, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from 'axios';

const RegisterComponent: NextPage = () => {    
    //onSubmit button
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(true);
    //Show Password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    //Show Confirm Password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    //Router
    const router = useRouter()
    //formik hook
    const formik = useFormik<SignUpFormValues>({
        initialValues:  initialValues,
        onSubmit: async (values) => {
        setMessage('Registered successfully, please continue to login');
        setSubmitted(true);
        setOpen(true);
        try {
            axios.post('https://634ccfadf5d2cc648e950444.mockapi.io/userData', values);
        } catch (err) {
            console.log(err.response.data)
        }
        //wait a few seconds before redirecting using pre-loader
        router.replace('/Login')
      },
    //Validation
    validationSchema: validationRegisterSchema
    });
    
  return ( 
    <div>
            <Container component="main" maxWidth="xs" sx={{border: '1px solid grey', mt: 10, mb: 10}}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          > 
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        {submitted && <Collapse in={open}><Alert action={<IconButton aria-label="close" color="inherit" size="small" 
        onClick={() => {setOpen(false)}}><Close fontSize="inherit" /></IconButton>}>{message}</Alert></Collapse>}
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2}}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              error={formik.touched.firstName && !formik.values.firstName}
              helperText={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null}
              {...formik.getFieldProps('firstName')}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="middleName"
              fullWidth
              id="middleName"
              label="Middle Name"
              autoFocus
              {...formik.getFieldProps('middleName')}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              helperText={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}
              {...formik.getFieldProps('lastName')}
              error={formik.touched.lastName && !formik.values.lastName}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <hr></hr>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={(formik.errors.email && formik.touched.email) && formik.errors.email}
              {...formik.getFieldProps('email')}
              error={formik.touched.email && !!formik.errors.email}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <MuiPhoneNumber
              name="mobilenum"
              value={formik.values.mobilenum}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange('mobilenum')}            
              id="mobilenum"
              autoFormat={false}
              onlyCountries={['ph']}
              defaultCountry='ph'
              countryCodeEditable={false}
              regions={'asia'}
              required
              fullWidth
              label="Mobile Number"
              autoComplete="mobile num"
              helperText={(formik.errors.mobilenum && formik.touched.mobilenum) && formik.errors.mobilenum}
              error={formik.touched.mobilenum && !!formik.errors.mobilenum}
              variant="outlined"
              size="small"
            /> 
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="confirm-password"
              helperText={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
              {...formik.getFieldProps('confirmPassword')}
              error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            </Grid>
        </Grid>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
      </Box>
      </Container>
    </div>
)}

export default RegisterComponent