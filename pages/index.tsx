import { NextPage } from "next";
import SignupForm from "./components/SignUpForm";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Home: NextPage = () => {    
  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <SignupForm />
      </ThemeProvider>
    </>
  )
}

export default Home