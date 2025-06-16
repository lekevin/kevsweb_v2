import Header from "../sections/Header";
import About from "../sections/About";
import Hero from "../sections/Hero";
import Works from "../sections/Works";

const Home = () => {
  return (
    <div className="relative justify-center">
      <div className="relative h-screen bg-[url('src/assets/dunes.png')] font-montserrat bg-cover bg-center">
        <Header />
        <Hero />
        <About />
        <Works />
      </div>
    </div>
  );
};

export default Home;
