import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SignUpValidations from './SignUpValidations';
import { useState } from "react";
import { Alert, IconButton, Collapse } from "@mui/material";
import { Close } from "@mui/icons-material";


const SignupForm = () => {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(true);

    
  return (
    //Input field
    <div>
          {submitted && <Collapse in={open}><Alert action={<IconButton aria-label="close" color="inherit" size="small" 
          onClick={() => {setOpen(false)}}><Close fontSize="inherit" /></IconButton>}>{message}</Alert></Collapse>}
        <Container component="main" maxWidth="xs" sx={{border: '1px solid grey', mt: 2, mb: 2}}>
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
            <SignUpValidations setSubmitted={setSubmitted} setMessage={setMessage} setOpen={setOpen}/>
          </Box>
        </Container>
    </div>

  );
};

export default SignupForm