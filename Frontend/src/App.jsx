import AppRoutes from "./routes/AppRoutes.jsx";
import useAutoLogout from "./hooks/useAutoLogout";

function App() {
  useAutoLogout();

  return <AppRoutes />;
}

export default App;