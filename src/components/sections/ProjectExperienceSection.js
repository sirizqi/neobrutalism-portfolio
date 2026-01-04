"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { portfolioData } from "@/data/portfolio";

export default function ProjectExperienceSection() {
    const { projects } = portfolioData;
    const [isExpanded, setIsExpanded] = useState(false);

    const visibleProjects = isExpanded ? projects : projects.slice(0, 3); // Show 3 items initially for consistency

    return (
        <Container id="projects" className="bg-primary/5 dark:bg-primary/10">
            <SectionHeader
                title="Projects"
                subtitle="A snapshot of key projects I've spearheaded, showing the diversity of roles I play."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {visibleProjects.map((project, index) => (
                    <div key={index} className="border-4 border-black dark:border-white neo-shadow-lg bg-white dark:bg-black h-full flex flex-col neo-hover group">
                        <div className="p-8 pb-0">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center neo-shadow -rotate-3 group-hover:rotate-0 transition-transform">
                                    <img src={project.logo} alt={project.title} className="w-10 h-10 object-contain filter invert" onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=P' }} />
                                </div>
                                <Badge className="bg-secondary text-black border-4 border-black font-black uppercase tracking-tighter py-1 px-4 neo-shadow shadow-none text-sm">
                                    {project.type}
                                </Badge>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                                {project.title}
                            </h3>
                        </div>

                        <div className="p-8 flex-grow">
                            <ul className="space-y-3">
                                {project.description.map((bullet, i) => (
                                    <li key={i} className="flex gap-3 font-bold text-lg leading-tight">
                                        <span className="text-primary mt-1 text-2xl leading-none">•</span>
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 pt-0 mt-auto">
                            <Button asChild className="w-full h-14 border-4 border-black dark:border-white neo-shadow-primary neo-hover font-black uppercase text-xl bg-white dark:bg-black text-black dark:text-white">
                                <a href={project.website} target="_blank" rel="noopener noreferrer">
                                    View Project <ExternalLink className="ml-3 w-6 h-6" />
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length > 3 && (
                <div className="mt-16 text-center">
                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        size="lg"
                        className="h-16 px-10 text-xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg neo-hover bg-white dark:bg-black text-black dark:text-white"
                    >
                        {isExpanded ? (
                            <>Show Less <ChevronUp className="ml-3 w-6 h-6" /></>
                        ) : (
                            <>See More Projects <ChevronDown className="ml-3 w-6 h-6" /></>
                        )}
                    </Button>
                </div>
            )}
        </Container>
    );
}
