"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import ThemeToggle from "./ThemeToggle";
import SocialLinks from "./SocialLinks";

const NAV_ITEMS = [
    { label: "Home", href: "/#hero" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Rate Card", href: "/#rate-card" },
    { label: "Blogs", href: "/#blogs" },
    { label: "Contact", href: "/#contact" },
];

export default function NavigationBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b-4 border-black dark:border-white bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto flex h-24 items-center justify-between px-6 md:px-12">
                <Link href="/" className="text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors">
                    Rizqi<span className="text-primary">.S</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="px-4 py-2 font-black text-lg uppercase tracking-tight hover:bg-primary hover:text-white border-2 border-transparent hover:border-black dark:hover:border-white transition-all neo-hover mr-2"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
