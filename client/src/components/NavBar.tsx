import React, { FC, ReactElement } from "react";
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { routes } from "../utils/routes";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import btcLogo from "./btc.png";
import SearchComponent from "./SearchComponent";

const Navbar: FC = (): ReactElement => {
  const [anchorElNav, setAnchorElNav] = React.useState(undefined);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(undefined);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#1d1f31",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: "50px",
              width: "auto",
              display: "inline-block",
            }}
            alt="Bitcoin Logo"
            src={btcLogo}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              letterSpacing: "1.5px",
            }}
          >
            The Knuths
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {routes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                  sx={{
                    fontSize: "1rem",
                    marginLeft: "2rem",
                    letterSpacing: "1.25px",
                    fontWeight: "normal",
                    color: "#fff",
                  }}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
          </Box>
          <SearchComponent />
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;
