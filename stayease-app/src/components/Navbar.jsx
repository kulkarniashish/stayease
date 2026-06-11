import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import CONSTANTS from "../utils/constants";

export default function Navbar() {
  const { role, logout, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navButtonSx = (path) => ({
    color: "inherit",
    borderRadius: 1,
    px: 1.5,
    ...(pathname === path && {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderBottom: "2px solid #fff",
      fontWeight: 700,
    }),
  });

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", textDecoration: "none", color: "#fff" }}
          component={Link}
          to="/"
        >
          StayEase
        </Typography>

        <Button component={Link} to="/" sx={navButtonSx("/")}>
          Home
        </Button>

        {isAuthenticated && role === CONSTANTS.ROLES.GUEST && (
          <Button component={Link} to="/my-stays" sx={navButtonSx("/my-stays")}>
            My Stays
          </Button>
        )}

        {role === CONSTANTS.ROLES.MANAGER && (
          <Button component={Link} to="/manager" sx={navButtonSx("/manager")}>
            Manager
          </Button>
        )}

        {role === CONSTANTS.ROLES.ADMIN && (
          <Button component={Link} to="/admin/hotels" sx={navButtonSx("/admin/hotels")}>
            Admin
          </Button>
        )}

        {isAuthenticated ? (
          <Button color="inherit" onClick={() => { logout(); toast.info("You have been logged out."); navigate("/"); }}>
            Logout
          </Button>
        ) : (
          <Box>
            <Button component={Link} to="/login" sx={navButtonSx("/login")}>
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
