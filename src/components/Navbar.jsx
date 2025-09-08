import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Breadcrumbs,
  Link,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Search,
  HelpOutline,
  KeyboardArrowDown,
  AutoAwesome,
  NotificationsActive,
} from "@mui/icons-material";
import { theme } from "../theme";

const Navbar = () => {
  return (
    <>
      <AppBar
        aria-label="navbar"
        position="static"
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#212121",
          borderBottom: "1px solid #E0E0E0",
        }}
        elevation={0}
      >
        <Toolbar variant="dense">
          <Breadcrumbs aria-label="breadcrumb" separator=">">
            <Link underline="hover" color="text.secondary" href="#">
              Home
            </Link>
            <Typography color="primary" sx={{ fontWeight: "600" }}>
              Dashboard V2
            </Typography>
          </Breadcrumbs>
          <Box sx={{ flexGrow: 1 }} />{" "}
          <Box
            sx={{
              position: "relative",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: "#a3bad4ff",
              backgroundColor: theme.palette.background.default,
              "&:focus": {
                border: "2px solid",
              },
              marginRight: 5,
              width: { sm: "auto", md: "400px" },
              height: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: "0 10px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search fontSize="small" />
            </Box>
            <InputBase placeholder={"Search here..."} sx={{ flex: 1 }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginRight: 4,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
              solutions
            </Typography>
            <KeyboardArrowDown />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              sx={{
                color: "#673AB7",
                borderRadius: "8px",
              }}
            >
              <AutoAwesome sx={{ fontSize: "1.3rem", mr: 0.8 }} />
              <Typography variant="caption" sx={{ fontWeight: "600" }}>
                AI Copilot
              </Typography>
            </IconButton>
            <IconButton size="small" color="inherit">
              <HelpOutline sx={{ color: "text.secondary" }} />
            </IconButton>
            <IconButton size="small" color="inherit">
              <NotificationsActive sx={{ color: "text.secondary" }} />
            </IconButton>
            <Avatar
              sx={{
                bgcolor: "#673AB7",
                width: 30,
                height: 30,
                fontSize: "0.9rem",
              }}
            >
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
