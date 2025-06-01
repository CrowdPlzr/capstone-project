import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import DocumentManager from "@/components/DocumentManager";
import Capstone from "@/components/layout/Capstone";
import Contact from "@/components/layout/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <DocumentManager />
      <Capstone />
      <Contact />
    </main>
  );
}
