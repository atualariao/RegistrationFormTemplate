import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import type { NextComponentType, NextPageContext } from "next";
import MuiPhoneNumber from 'material-ui-phone-number-2';

//Object data types
type SignUpFormValues = {
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    mobilenum: string,
    username: string,
    password: string,
    confirmPassword: string,
  }

type SubmitButton = {
  setSubmitted: Function,
  setMessage: Function,
  setOpen: Function,
}

//Regex for password and mobile number validation
const specialCharas = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])(?=.*?[0-9])[A-Za-zd@$!%*#?&0-9]/
const theme = createTheme();
const philPhone = /^(09|\+639)\d{9}$/ // PH phone regex
const SignupForm: NextComponentType<NextPageContext, {}, SubmitButton> = (props: SubmitButton,) => {

    //Initial values
    const initialValues: SignUpFormValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobilenum: '',
        username: '',
        password: '',
        confirmPassword: '',
        }

    //Formik use
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
          props.setSubmitted(true),
          props.setMessage("Submitted"),
          props.setOpen(true)
          console.log(values) //Data from Form submitted as Object
        },
    
    //Validation
    validationSchema: yup.object({
        firstName: yup.string().trim().required('First Name is required'),
        middleName: yup.string(),
        lastName: yup.string().trim().required('Last Name is required'),
        email: yup
            .string()
            .email('Must be a valid email')
            .required('Email is required'),
        mobilenum: yup.string().strict(false).trim().matches(philPhone, 'Mobile Number is invalid').required('Mobile Number is required'),
        username: yup.string().trim().required('Username is required').min(4).max(10),
        password: yup.string().required().min(6).max(15).matches(specialCharas, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
        confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password does not match'),
        }),
  });
  
  return (
    
    //Input field
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <hr></hr>
            </Grid>
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
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.middleName}
              onChange={formik.handleChange}
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
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && !formik.values.lastName}
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
              helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
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
              helperText={formik.errors.mobilenum && formik.touched.mobilenum ? formik.errors.mobilenum : null}
              error={formik.touched.mobilenum && !!formik.errors.mobilenum}
            /> 
          </Grid>
          <Grid item xs={12}>
            <hr></hr>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              helperText={formik.errors.username && formik.touched.username ? formik.errors.username : null}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              helperText={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
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
    </ThemeProvider>
  );
};

export default SignupForm