"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommandKSearch({ blogs = [] }) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="flex h-12 w-full justify-between items-center px-4 border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black font-bold text-lg"
            >
                <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>Search articles...</span>
                </div>
                <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 bg-primary text-white border-2 border-black dark:border-white px-2 font-mono text-sm font-black">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Blogs">
                        {blogs.map((blog) => (
                            <CommandItem
                                key={blog.sys.id}
                                onSelect={() => {
                                    router.push(`/blogs/${blog.fields.slug}`);
                                    setOpen(false);
                                }}
                                className="font-medium flex gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                {blog.fields.tittle}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
