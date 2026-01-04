import { portfolioData } from "@/data/portfolio";
import SocialLinks from "@/components/global/SocialLinks";

export default function FooterSection() {
    const { personal } = portfolioData;

    return (
        <footer className="border-t-8 border-black dark:border-white py-20 px-4 md:px-8 bg-white dark:bg-black">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-5xl font-black uppercase tracking-tighter">
                            Rizqi<span className="text-primary">.S</span>
                        </h2>
                        <p className="text-xl font-bold max-w-sm">
                            Professional Product Executor. Expert in Product Life Cycle, Design, and Engineering.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <SocialLinks />
                        <p className="text-lg font-black uppercase tracking-tighter bg-primary text-white border-2 border-black px-4 py-1 neo-shadow">
                            © {new Date().getFullYear()} {personal.name}
                        </p>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t-4 border-black dark:border-white text-center">
                    <p className="text-sm font-black uppercase tracking-widest opacity-50">
                        Created with Passion and Neobrutalism Style
                    </p>
                </div>
            </div>
        </footer>
    );
}
