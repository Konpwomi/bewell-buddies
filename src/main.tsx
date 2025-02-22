import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";
import Bmi from "./pages/Bmi.tsx";
import Calorie from "./pages/Calorie.tsx";
import Exercise from "./pages/Exercise.tsx";
import Meal from "./pages/Meal.tsx";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/bmi-check" element={<Bmi />}></Route>
          <Route path="/calorie-count" element={<Calorie />}></Route>
          <Route path="/match-exercises" element={<Exercise />}></Route>
          <Route path="/meal-ideas" element={<Meal />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>,
  );
} else {
  console.error("Failed to find the root element");
}
