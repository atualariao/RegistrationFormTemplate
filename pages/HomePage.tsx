import React from 'react';
import NavComponent from '../components/NavComponent';
import { Typography, Container, Box } from '@mui/material';

const HomePage = () => {

        return (
            <>
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
                        <Typography component="h1" variant="h5" sx={{mb: 2}}>
                            Homepage
                        </Typography>
                    </Box>
                </Container>

            </>
        );

};

export default HomePage;