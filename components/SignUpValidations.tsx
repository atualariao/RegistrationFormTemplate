import { specialCharas, philPhone } from './Regex';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import { initialValues } from './InitialVals';
import { SubmitButton } from './ObjectTypes';
import type { NextComponentType, NextPageContext } from "next";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';


const SignUpValidations: NextComponentType<NextPageContext, {}, SubmitButton> = (props: SubmitButton,) => {

//Show Password
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);
//Confirm Password
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              value={formik.values.middleName}
              onChange={formik.handleChange}
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
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              helperText={formik.errors.mobilenum && formik.touched.mobilenum ? formik.errors.mobilenum : null}
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
              helperText={formik.errors.username && formik.touched.username ? formik.errors.username : null}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
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
    );
};

export default SignUpValidations;