import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DonutChartWidget = ({ widget }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: { xs: "column", sm: "row" },
      gap: 4,
    }}
  >
    <Box
      sx={{
        position: "relative",
        width: 200,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={widget.data.breakdown}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            startAngle={widget.name === "Cloud Accounts" ? 270 : 180}
            endAngle={widget.name === "Cloud Accounts" ? -120 : -180}
            dataKey="value"
            minAngle={4}
          >
            {widget.data.breakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box
        sx={{
          position: "absolute",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {widget.data.total}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total
        </Typography>
      </Box>
    </Box>

    <Box>
      {widget.data.breakdown.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: item.color,
              mr: 1,
              borderRadius: "2px",
            }}
          />
          <Typography variant="body2">{item.name}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            ({item.value})
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default DonutChartWidget;
