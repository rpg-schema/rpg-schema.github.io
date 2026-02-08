import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SchemaExplorer from "@/components/SchemaExplorer";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SchemaExplorer />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
