import { useWidget } from "../context/WidgetContext";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import noGraph from "../assets/no-graph.png";

const WidgetCard = ({ widget, categoryName }) => {
  const { dispatch } = useWidget();

  const handleRemoveWidget = () => {
    dispatch({
      type: "REMOVE_WIDGET",
      payload: { category: categoryName, widgetId: widget.id },
    });
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "donut":
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
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
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
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

      case "bar": {
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
      }

      case "empty":
        return (
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
              {widget.data.message}
            </Typography>
          </Box>
        );

      case "text":
        return (
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
            <img
              src={noGraph}
              alt="Custom widget"
              style={{ width: 64, height: 64, marginBottom: 16 }}
            />
            <Typography variant="body1" color="text.secondary">
              No Graph data available!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {widget.data.text}
            </Typography>
          </Box>
        );

      default:
        return <Typography>Widget type not supported</Typography>;
    }
  };

  return (
    <Card sx={{ height: "100%", minHeight: 300, borderRadius: 5 }}>
      <CardHeader
        action={
          <IconButton onClick={handleRemoveWidget}>
            <Close />
          </IconButton>
        }
        title={widget.name}
        titleTypographyProps={{ variant: "body1", fontWeight: 600 }}
      />
      <CardContent>{renderWidgetContent()}</CardContent>
    </Card>
  );
};

export default WidgetCard;
