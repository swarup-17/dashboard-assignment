import { Box, Typography } from "@mui/material";
import noGraph from "../../assets/no-graph.png";

const EmptyChart = ({ widget }) => (
  <Box
    sx={{
      height: "100%",
      minHeight: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
    <Box
      component={"img"}
      src={noGraph}
      alt="No data"
      sx={{ width: 64, height: 64, opacity: 0.5 }}
    />
    <Typography variant="body1" color="text.secondary">
      {widget.type === "empty"
        ? widget.data.message
        : "No Graph data available!"}
    </Typography>
    {widget.type === "text" && (
      <Typography variant="body2" color="text.secondary">
        {widget.data.text}
      </Typography>
    )}
  </Box>
);

export default EmptyChart;
