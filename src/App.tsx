import "./App.css";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import ProductPage from "./pages/ProductPage";
// import HomePage from "./pages/homePage/homePage";

function App() {
  return (
    <div className='overflow-x-hidden bg-[#d9ded4] text-dark'>
      <div className='relative overflow-hidden'>

      <Navbar />
      <Hero />
      <Menu />
      </div>
      <Banner />
      <ProductPage />
      <Footer />

{/*    <HomePage /> */}
    </div>
  );
}

export default App;
