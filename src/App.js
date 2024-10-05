import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import DiscussionPage from "./Pages/DiscussionPage";
import Models from "./Pages/Models";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import TailleursListe from "./Pages/TailleursListe";
import Parameters from "./Pages/Parameters";
import Measurements from "./Pages/Measurements";
import AchatCredit from "./Pages/AchatCredit";
import ListeSouhait from "./Pages/ListeSouhait";
import Panier from "./Pages/Panier";
import Ranking from "./Pages/Ranking";
import ListDiscussion from "./Pages/ListDiscussion";
import RightSideBar from "./Components/RightSideBar";

function App() {
  return (
    <Router>
      <div className="bg-blue-100 h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 md:flex-row flex-col-reverse overflow-hidden md:p-4 md:gap-8 lg:gap-24">
          {/* Sidebar */}
          <Sidebar color="bg-blue-700" />

          <div className="flex flex-col flex-1 overflow-hidden h-full">
            <Routes>
              <Route path="/" element={<MainPage />} />
              
              <Route path="/tailleurs" element={<TailleursListe />} />
              <Route path="/params" element={<Parameters />} />
              <Route path="/measurements" element={<Measurements />} />
              <Route path="/achatcredit" element={<AchatCredit />} />
              <Route path="/listesouhait" element={<ListeSouhait />} />
              <Route path="/Models" element={<Models />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/rang" element={<Ranking />} />
              <Route path="/discussion" element={<ListDiscussion />} />
              <Route path="/discussion/:id" element={<DiscussionPage />} />
            </Routes>
          </div>

          <RightSideBar color="bg-white" />
        </div>
      </div>
    </Router>
  );
}

export default App;
