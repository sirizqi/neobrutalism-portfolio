import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { getTestimonials } from "@/lib/contentful";

export default async function TestimonialsSection() {
    const testimonials = await getTestimonials();

    return (
        <Container id="testimonials" className="bg-primary/5 dark:bg-primary/10">
            <SectionHeader
                title="Testimonials"
                subtitle="Some people who have worked with me and their comments regarding my performance"
            />

            {testimonials && testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item) => {
                        const { name, companyName, jobTittle, testimonial } = item.fields;
                        return (
                            <Card key={item.sys.id} className="border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black h-full flex flex-col pt-6">
                                <CardHeader className="flex flex-row items-center gap-4 px-6 pb-4">
                                    <Avatar className="w-16 h-16 border-4 border-black neo-shadow">
                                        <AvatarFallback className="bg-primary text-white font-black text-xl">
                                            {name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black uppercase tracking-tighter leading-tight">
                                            {typeof name === 'string' ? name : 'Client'}
                                        </h4>
                                        <p className="font-bold text-primary text-sm">
                                            {typeof companyName === 'string' ? companyName : 'Company'}
                                        </p>
                                        <Badge variant="outline" className="mt-1 border-2 border-black dark:border-white font-bold bg-secondary">
                                            {typeof jobTittle === 'string' ? jobTittle : 'Position'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-6 pb-6 relative">
                                    <Quote className="absolute -top-2 -left-2 w-12 h-12 text-primary opacity-20 pointer-events-none" />
                                    <div className="font-bold text-lg leading-relaxed italic">
                                        {typeof testimonial === 'string'
                                            ? testimonial
                                            : testimonial?.content?.map(p => p.content?.map(t => t.value).join('')).join('\n') || 'Testimonial content unavailable'
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="p-12 text-center border-4 border-dashed border-black dark:border-white rounded-none bg-white dark:bg-black">
                    <p className="text-2xl font-black uppercase tracking-tighter opacity-50">
                        No testimonials available yet.
                    </p>
                </div>
            )}
        </Container>
    );
}
