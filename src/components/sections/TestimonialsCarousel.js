"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function TestimonialsCarousel({ testimonials }) {
    const [api, setApi] = React.useState(null);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {testimonials.map((item) => {
                        const { name, companyName, jobTittle, testimonial } = item.fields;
                        return (
                            <CarouselItem key={item.sys.id} className="pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                                <div className="h-full">
                                    <Card className="border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black h-full flex flex-col pt-6">
                                        <CardHeader className="flex flex-row items-center gap-4 px-6 pb-4">
                                            <Avatar className="w-16 h-16 border-4 border-black neo-shadow rounded-none">
                                                <AvatarFallback className="bg-primary text-white font-black text-xl rounded-none">
                                                    {name ? name[0] : '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xl font-black uppercase tracking-tighter leading-tight truncate">
                                                    {typeof name === 'string' ? name : 'Client'}
                                                </h4>
                                                <p className="font-bold text-primary text-sm truncate">
                                                    {typeof companyName === 'string' ? companyName : 'Company'}
                                                </p>
                                                <Badge variant="outline" className="mt-1 border-2 border-black dark:border-white font-bold bg-secondary truncate max-w-full">
                                                    {typeof jobTittle === 'string' ? jobTittle : 'Position'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-6 pb-6 relative flex-grow">
                                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary opacity-20 pointer-events-none" />
                                            {/* <div className="font-bold text-lg leading-relaxed italic line-clamp-6"> */}
                                            <div className="font-bold text-lg leading-relaxed italic">
                                                {typeof testimonial === 'string'
                                                    ? testimonial
                                                    : testimonial?.content?.map(p => p.content?.map(t => t.value).join('')).join('\n') || 'Testimonial content unavailable'
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 border-4 border-black dark:border-white neo-shadow-sm hover:neo-shadow-none bg-white dark:bg-black text-black dark:text-white" />
                <CarouselNext className="hidden md:flex -right-12 h-12 w-12 border-4 border-black dark:border-white neo-shadow-sm hover:neo-shadow-none bg-white dark:bg-black text-black dark:text-white" />
            </Carousel>

            <div className="flex justify-center mt-10 gap-2">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-4 h-4 border-2 border-black dark:border-white transition-all duration-300",
                            index + 1 === current
                                ? "bg-primary w-8 neo-shadow-sm translate-x-[-2px] translate-y-[-2px]"
                                : "bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900"
                        )}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
