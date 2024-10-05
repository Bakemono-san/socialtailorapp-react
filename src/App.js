import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Panier from "./Pages/Panier";
import Ranking from "./Pages/Ranking";
import ListDiscussion from "./Pages/ListDiscussion";
import DiscussionPage from "./Pages/DiscussionPage";
import Discussion from "./Components/Discussion";


function App() {
  return (
    <Router>
      <div className="bg-blue-100 h-dvh flex flex-col overflow-hidden justify-between">
        <Header />
        <div className="md:p-4 flex h-full flex-col-reverse justify-between md:flex-row">
          <Sidebar color="bg-blue-700" />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/discussion" element={<Discussion />} />
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
