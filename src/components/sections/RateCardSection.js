import { Mic2, Users, Rocket, CheckCircle2 } from "lucide-react";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";

const ICON_MAP = {
    speaker: Mic2,
    training: Users,
    project: Rocket,
};

export default function RateCardSection() {
    const { rateCards } = portfolioData;

    return (
        <Container id="rate-card">
            <SectionHeader
                title="Open Rate Card"
                subtitle="Transparent pricing and services for various collaboration formats."
                className="!mb-20"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {rateCards.map((card, index) => {
                    const Icon = ICON_MAP[card.type] || CheckCircle2;
                    const isTraining = card.type === "training";

                    return (
                        <div
                            key={index}
                            className={`relative p-10 border-4 border-black dark:border-white neo-shadow-lg flex flex-col h-full neo-hover bg-white dark:bg-black ${isTraining ? 'md:-translate-y-8 md:border-primary md:neo-shadow-primary' : ''}`}
                        >
                            {isTraining && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-black font-black uppercase tracking-tighter px-6 py-2 border-4 border-black dark:border-white neo-shadow whitespace-nowrap z-10">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-20 h-20 border-4 border-black dark:border-white neo-shadow flex items-center justify-center mb-8 ${isTraining ? 'bg-primary text-black' : 'bg-secondary text-black'}`}>
                                    <Icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-xl font-bold opacity-70">
                                    {card.description}
                                </p>
                            </div>

                            <div className="mb-10 flex items-baseline gap-2">
                                <span className="text-5xl font-black">{card.price}</span>
                            </div>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {card.points.map((point, i) => (
                                    <li key={i} className="flex gap-4 font-bold text-lg leading-tight items-start">
                                        <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isTraining ? 'text-primary' : 'text-black dark:text-white'}`} />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild className={`w-full h-20 text-2xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg neo-hover ${isTraining ? 'bg-primary text-black' : 'bg-white dark:bg-black text-black dark:text-white'}`}>
                                <a href={portfolioData.personal.whatsapp} target="_blank" rel="noopener noreferrer">
                                    Select Package
                                </a>
                            </Button>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
