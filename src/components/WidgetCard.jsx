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
import { lazy } from "react";
const DonutChartWidget = lazy(() => import("./charts/DonutChartWidget"));
const BarChartWidget = lazy(() => import("./charts/BarChartWidget"));
const EmptyChart = lazy(() => import("./charts/EmptyChart"));

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
        return <DonutChartWidget widget={widget} />;

      case "bar": {
        return <BarChartWidget widget={widget} />;
      }

      case "empty":
        return <EmptyChart widget={widget} />;

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
