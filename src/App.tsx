import "./App.css";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/homePage/homePage";

function App() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <HomePage />
    </div>
  );
}

export default App;
