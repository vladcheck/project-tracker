import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
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
import { TechnologyContext } from "./context/technologyContext";

export default function App() {
  const [technologies, setTechnologies] = useLocalStorage(
    "technologies",
    techMock,
  );

  return (
    <TechnologyContext.Provider value={{ technologies, setTechnologies }}>
      <ErrorBoundary
        fallback={
          <main
            style={{
              width: "100vw",
              maxHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Ой! Что-то сломалось :/</h1>
            <Navigation />
          </main>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/technologies" element={<TechnologyListPage />} />
              <Route path="/add-technology" element={<AddTechnologyPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TechnologyContext.Provider>
  );
}
