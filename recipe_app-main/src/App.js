import "./App.css";
import { Routes, Route } from "react-router-dom";
// Pages
import AboutPage from "./pages/AboutPage/AboutPage";
import HomePage from "./pages/HomePage/HomePage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EditRecipes from "./pages/EditRecipes/EditRecipes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="editRecipes" element={<EditRecipes />} />


        {/* TODO: Add more links as needed here */}
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
