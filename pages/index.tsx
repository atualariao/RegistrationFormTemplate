import { NextPage } from "next";
import { Alert, IconButton, Collapse } from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import SignupForm from "./components/SignUpForm";

const Home: NextPage = () => {    
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(true);

  return (
    <>
      {submitted && <Collapse in={open}><Alert action={<IconButton aria-label="close" color="inherit" size="small" 
      onClick={() => {setOpen(false)}}><Close fontSize="inherit" /></IconButton>}>{message}</Alert></Collapse>}
      <SignupForm setSubmitted={setSubmitted} setMessage={setMessage} setOpen={setOpen}/>
    </>
  )
}

export default Home