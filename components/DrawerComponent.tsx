import React from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const pages = ['HomePage', 'Contact', 'Profile', 'Login', 'Register'];
const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <div>
            <Drawer open={openDrawer}
            onClose={() => setOpenDrawer(false) }
            >
                <List>
                    {
                        pages.map((page, index) => (
                            <ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
                                <ListItemIcon>
                                    <ListItemText>{page}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        
                        ))
                    }
                </List>
            </Drawer>
            <IconButton sx={{color:'white', marginLeft: 'auto' }} onClick={() => setOpenDrawer(true)}>
                <MenuIcon />
            </IconButton>
        </div>
    );
};

export default DrawerComponent;