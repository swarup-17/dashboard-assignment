import { Suspense } from "react";
import DashboardPage from "./components/DashboardPage";
import { WidgetProvider } from "./context/WidgetContext";
import { Typography } from "@mui/material";

function App() {
  return (
    <Suspense fallback={<Typography>Loading Dashboard...</Typography>}>
      <WidgetProvider>
        <DashboardPage />
      </WidgetProvider>
    </Suspense>
  );
}

export default App;
