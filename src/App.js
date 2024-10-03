import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Discussion from "./Pages/Discussion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import AchatCredit from "./Pages/AchatCredit";


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
            <Route path="/achatcredit" element={<AchatCredit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
