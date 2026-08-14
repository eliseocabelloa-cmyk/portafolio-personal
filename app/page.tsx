import { PortfolioProvider } from "@/components/portfolio-context"
import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero/hero-section"
import { ProjectsSection } from "@/components/projects/projects-section"
import { SkillsSection } from "@/components/skills/skills-section"
import { ContactTerminal } from "@/components/contact/ContactTerminal"
import { ContactModal } from "@/components/contact/contact-modal"
import { LiveTerminal } from "@/components/live-terminal"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <PortfolioProvider>
      <NavBar />
      <main className="bg-background text-foreground">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactTerminal />
      </main>
      <Footer />
      <ContactModal />
      <LiveTerminal />
    </PortfolioProvider>
  )
}
