import { Box, Drawer, List, ListItemButton, ListItemText, ListItemIcon, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import flugo from '../assets/img/flugo.png';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

export function Layout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            <img src={flugo} alt="flugo" width={60} />
          </Typography>
        </Toolbar>

        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Colaborador" />
            <ListItemIcon sx={{ display: "flex", justifyContent:"end" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}