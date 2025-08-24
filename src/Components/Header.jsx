import { NavLink } from "react-router";
import { MENU_ITEMS } from '../Utils/Utils';
import { AppBar, Box, IconButton, Toolbar, Button } from "@mui/material"
import PetsIcon from '@mui/icons-material/Pets';

/*
    Header component for the application.
    Contains navigation links to different pages using NavLink from react-router.
    TO_DO: Inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
    TO_DO: Test cases will be added
*/

export const Header = () => {

    const HeaderLinkButtons = () => {
        return MENU_ITEMS.map((linkItem, index) => <Button key={index} color="inherit">
            <NavLink
                style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "700" : "",
                    };
                }}
                to={linkItem.url}>
                {linkItem.linkName}
            </NavLink >
        </Button>)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ width: '100vw', position: 'absolute', top: '0px', left: '0px', right: 'unset', backgroundColor: '#000000bf' }}>
                <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px' }}>
                    <Toolbar sx={{ pl: '10px !important' }}>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <NavLink to="/">
                                <PetsIcon sx={{ verticalAlign: 'baseline' }} />
                            </NavLink >
                        </IconButton>
                        <Box edge="end" sx={{ display: { sm: 'block' } }}>
                            <HeaderLinkButtons />
                        </Box>
                    </Toolbar>
                </div>
            </AppBar>
        </Box>
    );
}