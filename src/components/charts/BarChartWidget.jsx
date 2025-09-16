import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const BarChartWidget = ({ widget }) => {
  const stackedData = [
    widget.data.breakdown.reduce(
      (acc, item) => {
        acc[item.name] = item.value;
        return acc;
      },
      { row: "bar" }
    ),
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {widget.data.total}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {widget.tag}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <ResponsiveContainer width="100%" height={24}>
          <BarChart
            data={stackedData}
            layout="vertical"
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <XAxis type="number" hide domain={[0, widget.data.total]} />
            <YAxis type="category" dataKey="row" hide />
            {widget.data.breakdown.map((entry, index) => {
              const isFirst = index === 0;
              const isLast = index === widget.data.breakdown.length - 1;
              return (
                <Bar
                  key={index}
                  dataKey={entry.name}
                  stackId="a"
                  fill={entry.color}
                  barSize={24}
                  radius={
                    isFirst ? [12, 0, 0, 12] : isLast ? [0, 12, 12, 0] : 0
                  }
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box>
        {widget.data.breakdown.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              ({item.value})
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BarChartWidget;
