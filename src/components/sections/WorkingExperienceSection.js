"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Briefcase } from "lucide-react";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { portfolioData } from "@/data/portfolio";

export default function WorkingExperienceSection() {
    const { experiences } = portfolioData;

    return (
        <Container id="experience">
            <SectionHeader
                title="Experience"
                subtitle="The professional journey that shaped my skills and expertise over the decade."
            />

            <div className="grid grid-cols-1 gap-12">
                {experiences.map((exp, index) => (
                    <div key={index} className="border-4 border-black dark:border-white neo-shadow-lg bg-white dark:bg-black overflow-hidden flex flex-col md:flex-row shadow-none group">
                        <div className="md:w-1/3 p-10 bg-primary text-white flex flex-col items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white">
                            <div className="w-24 h-24 bg-white border-4 border-black rounded-none flex items-center justify-center mb-6 neo-shadow rotate-3 group-hover:rotate-0 transition-transform">
                                <img src={exp.logo} alt={exp.company} className="w-16 h-16 object-contain" onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Logo' }} />
                            </div>
                            <span className="font-black text-center uppercase tracking-tighter text-xl">
                                {exp.period}
                            </span>
                        </div>

                        <div className="flex-1 p-10 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-4xl font-black uppercase tracking-tight leading-none">{exp.role}</h3>
                                    <p className="text-2xl font-bold text-primary mt-2">{exp.company}</p>
                                </div>
                                <Badge className="w-fit text-xl border-4 border-black dark:border-white bg-secondary text-black font-black uppercase tracking-tighter py-1 px-4 neo-shadow shadow-none">
                                    {exp.location}
                                </Badge>
                            </div>

                            <ul className="space-y-4">
                                {exp.description.map((point, i) => (
                                    <li key={i} className="flex gap-4 font-bold text-lg leading-snug">
                                        <span className="mt-2 w-3 h-3 bg-primary border-2 border-black flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                asChild
                                className="mt-6 border-4 border-black dark:border-white neo-shadow-primary neo-hover h-14 px-8 text-xl font-black uppercase bg-white dark:bg-black text-black dark:text-white"
                            >
                                <a href={exp.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website <ExternalLink className="ml-3 w-6 h-6" />
                                </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
