import { useWidget } from "../context/WidgetContext";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Add,
  MoreVert,
  AccessTimeFilled,
  KeyboardArrowDown,
  Sync,
} from "@mui/icons-material";
import CategorySection from "./CategorySection";
import AddWidget from "./AddWidget";
import Navbar from "./Navbar";

const DashboardPage = () => {
  const theme = useTheme();
  const { state, dispatch } = useWidget();
  const { categories, searchTerm, isAddWidgetOpen } = state;

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddWidget = () => {
    dispatch({ type: "OPEN_ADD_WIDGET", payload: null });
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
  };

  const filteredCategories = Object.entries(categories).reduce(
    (acc, [categoryName, widgets]) => {
      const categoryMatch = categoryName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const widgetMatches = widgets.filter((w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (categoryMatch || widgetMatches.length > 0) {
        acc[categoryName] = categoryMatch ? widgets : widgetMatches;
      }
      return acc;
    },
    {}
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: isSmallScreen ? 2 : 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexDirection: isSmallScreen ? "column" : "row",
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
            CNAPP Dashboard
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: isSmallScreen ? "center" : "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<Add />}
              onClick={handleAddWidget}
              size="small"
              sx={{ minWidth: "auto", textTransform: "none" }}
            >
              Add Widget
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => window.location.reload()}
              sx={{ minWidth: "auto", px: 1 }}
            >
              <Sync fontSize="small" />
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ minWidth: "auto", px: 1 }}
            >
              <MoreVert fontSize="small" />
            </Button>

            <Button
              variant="outlined"
              size="small"
              sx={{
                minWidth: isSmallScreen ? 40 : 130,
                bgcolor: "#ffffff",
                color: "#001883ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 0.5,
                textTransform: "none",
              }}
            >
              <AccessTimeFilled fontSize="small" />
              <KeyboardArrowDown
                sx={{ display: isSmallScreen ? "block" : "none" }}
                fontSize="small"
              />
              {!isSmallScreen && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      mx: 0.5,
                      borderWidth: 0.2,
                      borderColor: theme.palette.divider,
                    }}
                  />
                  Last 2 days
                  <KeyboardArrowDown fontSize="small" />
                </>
              )}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {Object.entries(filteredCategories).map(([categoryName, widgets]) => (
            <Grid size={{ xs: 12 }} key={categoryName}>
              <CategorySection categoryName={categoryName} widgets={widgets} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {isAddWidgetOpen && <AddWidget />}
    </Box>
  );
};
export default DashboardPage;
