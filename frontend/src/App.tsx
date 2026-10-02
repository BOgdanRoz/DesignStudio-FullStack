import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import AboutSection from "./components/AboutSection/AboutSection"
import ServicesSection from "./components/ServicesSection/ServicesSection"
import PortfolioSection from "./components/PortfolioSection/PortfolioSection"
import ContactSection from "./components/ContactSection/ContactSection"
import Footer from "./components/Footer/Footer"
import OrderModal from "./components/OrderModal/OrderModal"
import RoleSelection from "./components/RoleSelection/RoleSelection"
import type { Role } from "./components/RoleSelection/RoleSelection"
import { useState } from "react"

const roleStorageKey = "design-studio-role"

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hasSelectedRole, setHasSelectedRole] = useState(
    () => sessionStorage.getItem(roleStorageKey) !== null,
  )
  const role = sessionStorage.getItem(roleStorageKey) as Role | null

  if (!hasSelectedRole) {
    return (
      <RoleSelection
        onSelect={(role) => {
          sessionStorage.setItem(roleStorageKey, role)
          setHasSelectedRole(true)
        }}
      />
    )
  }

  const changeRole = () => {
    sessionStorage.removeItem(roleStorageKey)
    setHasSelectedRole(false)
  }

  return (
    <div id="top">
      <Header onChangeRole={changeRole}/>
      <HeroSection/>
      <ServicesSection role={role ?? "client"} onOrder={setSelectedService}/>
      <PortfolioSection/>
      <AboutSection/>
      {role === "client" && <ContactSection onOrder={() => setSelectedService("Project enquiry")}/>}
      <Footer/>
      {role === "client" && (
        <OrderModal
          key={selectedService ?? "closed"}
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}

export default App
