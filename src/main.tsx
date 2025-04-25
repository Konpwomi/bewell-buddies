import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";
import BmiCheck from "./pages/BmiCheck.tsx";
import CalorieCount from "./pages/CalorieCount.tsx";
import MatchExercises from "./pages/MatchExercises.tsx";
import MealIdeas from "./pages/MealIdeas.tsx";
import TrackProgress from "./pages/TrackProgress.tsx";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/bmi-check" element={<BmiCheck />}></Route>
          <Route path="/calorie-count" element={<CalorieCount />}></Route>
          <Route path="/track-progress" element={<TrackProgress />}></Route>
          <Route path="/match-exercises" element={<MatchExercises />}></Route>
          <Route path="/meal-ideas" element={<MealIdeas />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>,
  );
} else {
  console.error("Failed to find the root element");
}
