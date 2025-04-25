// File: src/pages/Home.jsx
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import About from "../components/About";
import ToolSection from "../components/ToolSection";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import NewsletterSignup from "../components/NewsletterSignup";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";

export default function Home({ darkMode, setDarkMode }) {
  return (
    <main className="relative font-sans bg-white dark:bg-[#0e0e10] text-black dark:text-white transition-colors duration-500">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <CommandPalette />
      <Hero />
      <About />
      <ToolSection />
      <Stats />
      <Testimonials />
      <NewsletterSignup />
      <Footer />
    </main>
  );
}