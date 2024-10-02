import Header from "./Components/Header";
import MainPage from "./Components/MainPage";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="bg-blue-100 pb-16">
      <Header />
      <div className="md:p-4 md:flex">
        <Sidebar color="bg-blue-700" />
        <MainPage />
      </div>
    </div>
  );
}

export default App;
