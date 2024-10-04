import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Discussion from "./Pages/Discussion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"; // Nouvelle importation de Signup

function App() {
  return (
    <Router>
      <div className="bg-blue-100 pb-16 h-full">
        <Routes>
          {/* Route dédiée pour la page de connexion */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
              <>
                <Header />
                <div className="md:p-4 md:flex">
                  <Sidebar color="bg-blue-700" />
                  <MainPage />
                </div>
              </>
            }
          />
          <Route path="/discussion" element={
              <>
                <Header />
                <div className="md:p-4 md:flex">
                  <Sidebar color="bg-blue-700" />
                  <Discussion />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;