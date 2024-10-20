import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import DiscussionPage from "./Pages/DiscussionPage";
import Models from "./Pages/Models";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import TailleursListe from "./Pages/TailleursListe";
import Parameters from "./Pages/Parameters";
import Measurements from "./Pages/Measurements";
import AchatCredit from "./Pages/AchatCredit";
import ListeSouhait from "./Pages/ListeSouhait";
import Panier from "./Pages/Panier";
import Ranking from "./Pages/Ranking";
import ListDiscussion from "./Pages/ListDiscussion";

import Article from "./Pages/Article"; // make sure this path is correct

import ProfilePage from "./Pages/ProfilePage";

import RightSideBar from "./Components/RightSideBar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { createContext, useState } from "react";
import Notation from "./Pages/Notation";
import FavorisPosts from "./Pages/FavorisPosts";
import MyFollowers from "./Pages/MyFollowers";
import ChangeRole from "./Components/Forms/ChangeRole";
import ErrorBoundary from "./Pages/ErrorBoundary";
import NotificationList from "./Pages/NotificationList"; 
import Followings from "./Pages/Followings";
import ParamButton from "./Components/ParamButton";

// Create a context
export const DataContext = createContext();

function App() {
  const [datas, setDatas] = useState({});
  return (
    <DataContext.Provider value={{ value: datas, setValue: setDatas }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={
            <div className="bg-[#f0f3f9] h-screen flex flex-col overflow-hidden">
              <ParamButton />
              <Header />
              <div className="flex flex-1 md:flex-row flex-col-reverse overflow-hidden md:p-4 md:gap-8 lg:gap-24">
                {/* Sidebar */}
                <Sidebar color="bg-[#3b5999]"/>

                  <div className="flex flex-col flex-1 overflow-hidden h-full">
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/tailleurs" element={<TailleursListe />} />
                      <Route path="/article" element={<Article />} />{" "}
                      {/* New Route */}
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/params" element={<Parameters />} />
                      <Route path="/measurements" element={<Measurements />} />
                      <Route path="/achatcredit" element={<AchatCredit />} />
                      <Route path="/listesouhait" element={<ListeSouhait />} />
                      <Route path="/Models" element={<Models />} />
                      <Route path="/panier" element={<Panier />} />
                      <Route path="/rang" element={<Ranking />} />
                      <Route
                        path="/discussion"
                        element={
                          <ErrorBoundary>
                            <ListDiscussion />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/discussion/:id"
                        element={<DiscussionPage />}
                      />
                      <Route path="/note" element={<Notation />} />
                      <Route path="/favorisPosts" element={<FavorisPosts />} />
                      <Route path="/myFollowers" element={<MyFollowers />} />
                      <Route path="/changeRole" element={<ChangeRole />} />
                      <Route path="/following" element={<Followings />} />
                        
                    <Route path="/notifications" element={<NotificationList />} /> {/* Nouvelle route pour les notifications */}
                    </Routes>
                  </div>

                  <RightSideBar color="bg-white" />
                </div>
              </div>
          } />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}


export default App;
