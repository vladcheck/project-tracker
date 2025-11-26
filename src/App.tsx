import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  HomePage,
  SettingsPage,
  TechnologyListPage,
  AddTechnologyPage,
  StatisticsPage,
} from "./pages";
import useLocalStorage from "./hooks/useLocalStorage";
import { techMock } from "./mock";
import { TechnologyContext } from "./context/TechnologyContext";
import NotFound from "./pages/NotFound/NotFound";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserContext from "./context/UserContext";

export default function App() {
  const [technologies, setTechnologies] = useLocalStorage(
    "technologies",
    techMock,
  );
  const isLoggedIn = !Object.is(useLocalStorage("user", {}), {});

  return (
    <TechnologyContext.Provider value={{ technologies, setTechnologies }}>
      <UserContext.Provider value={{ isLoggedIn }}>
        <ErrorBoundary fallback={<NotFound />}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/technologies" element={<TechnologyListPage />} />
                <Route path="/add-technology" element={<AddTechnologyPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </UserContext.Provider>
    </TechnologyContext.Provider>
  );
}
