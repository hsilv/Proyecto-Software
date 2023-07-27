import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./context/sessionContext";
import { MainRoutes } from "./routes/mainRoutes";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <MainRoutes />
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
