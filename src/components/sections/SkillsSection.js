import * as LucideIcons from "lucide-react";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { portfolioData } from "@/data/portfolio";

// Helper to get Icon component safely
const getIcon = (name) => {
    return LucideIcons[name] || LucideIcons.Zap;
};

export default function SkillsSection() {
    const { skillsGroups } = portfolioData;

    return (
        <Container id="skills">
            <SectionHeader
                title="Skills"
                subtitle="A versatile toolkit built over years of product execution, from design to code."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {skillsGroups.map((group, index) => (
                    <div key={index} className="border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black p-8 flex flex-col h-full neo-hover group">
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 bg-primary text-white border-4 border-black px-4 py-2 inline-block w-fit -rotate-2 group-hover:rotate-0 transition-transform">
                            {group.name}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {group.skills.map((skill, i) => {
                                const Icon = getIcon(skill.icon);
                                return (
                                    <div key={i} className="flex flex-col items-center justify-center p-4 border-4 border-black dark:border-white bg-secondary/20 font-black uppercase tracking-tighter text-sm w-24 h-24 text-center neo-shadow shadow-none hover:bg-secondary transition-colors">
                                        <Icon className="w-8 h-8 mb-2 text-primary" />
                                        <span className="leading-none">{skill.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
