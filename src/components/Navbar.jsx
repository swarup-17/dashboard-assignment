import { useState, useEffect } from "react";
import { useWidget } from "../context/WidgetContext";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Breadcrumbs,
  IconButton,
  Avatar,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  AutoAwesome,
  NotificationsActive,
  Close,
} from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { state, dispatch } = useWidget();
  const { searchTerm } = state;
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = (open) => () => setIsDrawerOpen(open);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch({ type: "SET_SEARCH_TERM", payload: localSearch });
    }, 200);

    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFFFFF",
          color: "text.secondary",
          borderBottom: "1px solid #E0E0E0",
        }}
        elevation={0}
      >
        <Toolbar variant="dense">
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="›"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Typography underline="hover" color="text.secondary">
              Home
            </Typography>
            <Typography color="primary" sx={{ fontWeight: "600" }}>
              Dashboard V2
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h6"
            color="primary"
            sx={{
              display: { xs: "block", sm: "none" },
              fontWeight: "600",
              fontSize: { xs: "14px", sm: "14px" },
            }}
          >
            Dashboard V2
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile ? (
            <Box
              sx={{
                position: "relative",
                borderRadius: "8px",
                border: "1px solid grey",
                display: "flex",
                alignItems: "center",
                width: "300px",
                height: "40px",
              }}
            >
              <Search sx={{ color: "text.secondary", ml: 1 }} />
              <InputBase
                placeholder="Search anything..."
                sx={{ ml: 1, flex: 1, pr: 2 }}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </Box>
          ) : (
            <IconButton color="inherit" onClick={handleToggleDrawer(true)}>
              <Search />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, md: 2 },
              ml: { xs: 2, md: 9 },
            }}
          >
            <IconButton
              sx={{
                color: "#673AB7",
                borderRadius: "8px",
              }}
            >
              <AutoAwesome sx={{ fontSize: "1.3rem" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "600",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                AI Copilot
              </Typography>
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
              SS
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={handleToggleDrawer(false)}
        PaperProps={{ sx: { p: 2 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleToggleDrawer(false)}>
            <Close />
          </IconButton>
          <InputBase
            autoFocus
            placeholder="Search anything..."
            fullWidth
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            sx={{
              ml: 1,
              border: "1px solid grey",
              borderRadius: "8px",
              p: "4px 8px",
            }}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
