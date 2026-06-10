import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import About from './components/About'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { LanguageProvider } from './i18n/LanguageContext'
import { TenantProvider } from './TenantContext'

export default function App() {
  return (
    <LanguageProvider>
      <TenantProvider>
        <Navbar />
        <main>
          <Hero />
          <Products />
          <Services />
          <About />
          <FAQ />
        </main>
        <Footer />
      </TenantProvider>
    </LanguageProvider>
  )
}
