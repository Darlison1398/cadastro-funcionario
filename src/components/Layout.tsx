import { Box, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

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
            Minha Empresa
          </Typography>
        </Toolbar>

        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="Funcionários" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/novo")}>
            <ListItemText primary="Novo Funcionário" />
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