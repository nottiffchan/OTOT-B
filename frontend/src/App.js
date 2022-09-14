import Navbar from "./components/Navbar";
import MainContainer from "./components/MainContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Navbar />
      <MainContainer />
    </div>
  );
}

export default App;
