import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ total, current, pageSize = 20 }) {
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-12">
            <Button
                asChild={current > 1}
                disabled={current <= 1}
                variant="outline"
                className="border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black font-bold h-12 w-12 p-0"
            >
                {current > 1 ? (
                    <Link href={`/blogs?page=${current - 1}`}>
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                ) : (
                    <ChevronLeft className="w-6 h-6" />
                )}
            </Button>

            <span className="font-black text-xl px-4 py-2 bg-primary text-white border-4 border-black dark:border-white neo-shadow">
                {current} / {totalPages}
            </span>

            <Button
                asChild={current < totalPages}
                disabled={current >= totalPages}
                variant="outline"
                className="border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black font-bold h-12 w-12 p-0"
            >
                {current < totalPages ? (
                    <Link href={`/blogs?page=${current + 1}`}>
                        <ChevronRight className="w-6 h-6" />
                    </Link>
                ) : (
                    <ChevronRight className="w-6 h-6" />
                )}
            </Button>
        </div>
    );
}
