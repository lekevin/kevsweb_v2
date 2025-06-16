import Header from "../sections/Header";
import About from "../sections/About";
import Hero from "../sections/Hero";
import Works from "../sections/Works";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

const Home = () => {
  return (
    <div className="relative justify-center">
      <div className="relative h-screen bg-[url('src/assets/dunes.png')] font-montserrat bg-cover bg-center">
        <Header />
        <Hero />
        <About />
        <Works />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
