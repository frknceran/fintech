import "@/App.css";
import AppRouter from "@/router/index";
import { AuthProvider } from "@/context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
