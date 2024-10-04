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
import DiscussionPage from "./Pages/DiscussionPage";


function App() {
  return (
    <Router>
      <div className="bg-blue-100 h-dvh flex flex-col overflow-hidden justify-between">
        <Header />
        <div className="md:p-4 flex h-full flex-col-reverse justify-between md:flex-row">
          <Sidebar color="bg-blue-700" />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/tailleurs" element={<TailleursListe />} />
            <Route path="/params" element={<Parameters />} />
            <Route path="/measurements" element={<Measurements/>} />
            <Route path="/achatcredit" element={<AchatCredit />} />
            <Route path="/listesouhait" element={< ListeSouhait/>} />
            <Route path="/Models" element={<Models/>} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/rang" element={<Ranking />} />
            <Route path="/discussion" element={<ListDiscussion />} />
            <Route path={`/discussion/:id`} element={<DiscussionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
