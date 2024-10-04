import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Discussion from "./Pages/Discussion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import TailleursListe from "./Pages/TailleursListe";
import Parameters from "./Pages/Parameters";
import Measurements from "./Pages/Measurements";


function App() {
  return (
    <Router>
      <div className="bg-blue-100 pb-16 h-full">
        <Header />
        <div className="md:p-4 md:flex">
          <Sidebar color="bg-blue-700" />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/tailleurs" element={<TailleursListe />} />
            <Route path="/params" element={<Parameters />} />
            <Route path="/measurements" element={<Measurements/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
