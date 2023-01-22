import Hero from "../components/Home/Hero";
import TopProjects from "../components/Home/TopProjects";
import Footer from "../components/utils/Footer";
import Navbar from "../components/utils/Navbar";
import Wrapper from "../components/utils/Wrapper";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Wrapper className="!py-0">
        <TopProjects />
      </Wrapper>
      <Footer />
    </main>
  );
}
