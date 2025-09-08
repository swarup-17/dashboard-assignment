import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import DashboardPage from "./components/DashboardPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardPage />
    </ThemeProvider>
  );
}

export default App;
