import { useWidget } from "../context/WidgetContext";
import { Grid, Typography, Button, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import WidgetCard from "./WidgetCard";

const CategorySection = ({ categoryName, widgets }) => {
  const { dispatch } = useWidget();

  const handleAddWidget = () => {
    dispatch({ type: "OPEN_ADD_WIDGET", payload: categoryName });
  };

  return (
    <>
      <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom>
        {categoryName}
      </Typography>
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={widget.id}>
            <WidgetCard widget={widget} categoryName={categoryName} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              minHeight: 300,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Add />}
              onClick={handleAddWidget}
            >
              Add Widget
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CategorySection;
