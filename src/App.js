import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ListDiscussion from "./Pages/ListDiscussion";
import DiscussionPage from "./Pages/DiscussionPage";


function App() {
  return (
    <Router>
      <div className="bg-blue-100 pb-16 h-screen overflow-hidden">
        <Header />
        <div className="md:p-4 md:flex">
          <Sidebar color="bg-blue-700" />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/discussion" element={<ListDiscussion />} />
            <Route path={`/discussion/:id`} element={<DiscussionPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
