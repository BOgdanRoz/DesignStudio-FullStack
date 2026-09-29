import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import AboutSection from "./components/AboutSection/AboutSection"
import ServicesSection from "./components/ServicesSection/ServicesSection"
import PortfolioSection from "./components/PortfolioSection/PortfolioSection"
import ContactSection from "./components/ContactSection/ContactSection"
import Footer from "./components/Footer/Footer"
import OrderModal from "./components/OrderModal/OrderModal"
import { useState } from "react"


function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <div id="top">
      <Header/>
      <HeroSection/>
      <ServicesSection onOrder={setSelectedService}/>
      <PortfolioSection/>
      <AboutSection/>
      <ContactSection onOrder={() => setSelectedService("Project enquiry")}/>
      <Footer/>
      <OrderModal
        key={selectedService ?? "closed"}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  )
}

export default App
