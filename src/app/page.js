import HeroSection from "@/components/sections/HeroSection";
import WorkingExperienceSection from "@/components/sections/WorkingExperienceSection";
import ProjectExperienceSection from "@/components/sections/ProjectExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import RateCardSection from "@/components/sections/RateCardSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogsSection from "@/components/sections/BlogsSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <WorkingExperienceSection />
      <ProjectExperienceSection />
      <SkillsSection />
      <RateCardSection />
      <TestimonialsSection />
      <BlogsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
