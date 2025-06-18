import Header from "../sections/Header";
import About from "../sections/About";
import Hero from "../sections/Hero";
import Works from "../sections/Works";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import dunes from "../assets/dunes.jpg";

const Home = () => {
  return (
    <div className="relative justify-center">
      <div
        className="relative h-screen font-montserrat bg-cover bg-center"
        style={{
          backgroundImage: `url(${dunes})`,
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
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
