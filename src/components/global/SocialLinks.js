import {
    Linkedin, Github, Instagram, Twitter, Mail, MessageCircle, Send
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const ICON_MAP = {
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
    x: Twitter,
    threads: Send, // Lucide doesn't have Threads yet, using Send as placeholder
    email: Mail,
    whatsapp: MessageCircle,
};

export default function SocialLinks({ className = "" }) {
    const { social } = portfolioData;

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {Object.entries(social).map(([key, url]) => {
                const Icon = ICON_MAP[key];
                if (!Icon) return null;
                return (
                    <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border-4 border-black dark:border-white bg-white dark:bg-black neo-shadow-primary neo-hover"
                    >
                        <Icon className="w-6 h-6" />
                        <span className="sr-only">{key}</span>
                    </a>
                );
            })}
        </div>
    );
}
