import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Download, MessageSquare } from "lucide-react";
import Container from "@/components/global/Container";
import { portfolioData } from "@/data/portfolio";

export default function HeroSection() {
    const { personal } = portfolioData;

    return (
        <Container id="hero" className="flex flex-col lg:flex-row items-start gap-16 py-32 md:py-48">
            <div className="flex-1 space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-black border-4 border-black dark:border-white neo-shadow font-black uppercase text-sm animate-bounce">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Open for Project
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-pretty">
                        Hello I’m <br />
                        <span className="text-primary">{personal.name}</span>
                    </h1>
                </div>

                <p className="text-xl md:text-3xl font-bold bg-white dark:bg-black p-8 border-4 border-black dark:border-white neo-shadow-lg inline-block max-w-2xl leading-tight">
                    {personal.tagline}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6">
                    <Button
                        asChild
                        size="lg"
                        className="h-20 px-10 text-2xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg neo-hover bg-primary text-white"
                    >
                        <a href={personal.whatsapp} target="_blank" rel="noopener noreferrer">
                            Contact me <Mail className="ml-3 w-7 h-7" />
                        </a>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-20 px-10 text-2xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg neo-hover bg-white dark:bg-black"
                    >
                        <a href="/cv.pdf" target="_blank">
                            Download CV <Download className="ml-3 w-7 h-7" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* <div className="flex-shrink-0 relative mt-10 lg:mt-24">
                <div className="absolute -inset-4 bg-primary border-4 border-black dark:border-white neo-shadow rotate-3 -z-10" />
                <div className="relative border-8 border-black dark:border-white neo-shadow-lg overflow-hidden w-48 h-48 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] mx-auto lg:mx-0">
                    <Avatar className="w-full h-full rounded-none">
                        <AvatarImage src="/avatar.jpg" alt={personal.name} className="object-cover" />
                        <AvatarFallback className="text-7xl md:text-9xl font-black bg-white text-black">
                            RS
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div> */}
        </Container>
    );
}
