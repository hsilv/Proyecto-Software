import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./context/sessionContext";
import { MainRoutes } from "./routes/mainRoutes";
import { NavProvider } from "./context/navContext";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <NavProvider>
          <MainRoutes />
        </NavProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
