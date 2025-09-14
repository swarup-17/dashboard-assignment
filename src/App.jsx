import DashboardPage from "./components/DashboardPage";
import { WidgetProvider } from "./context/WidgetContext";

function App() {
  return (
    <WidgetProvider>
      <DashboardPage />
    </WidgetProvider>
  );
}

export default App;
