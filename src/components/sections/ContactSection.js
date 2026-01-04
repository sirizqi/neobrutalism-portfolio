"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { portfolioData } from "@/data/portfolio";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { personal } = portfolioData;

    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    async function onSubmit(data) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.ok) {
                toast.success("Message sent successfully!", {
                    description: "Thank you for reaching out. I'll get back to you soon.",
                });
                form.reset();
            } else {
                throw new Error(result.error || "Failed to send message");
            }
        } catch (error) {
            toast.error("Oops! Something went wrong.", {
                description: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container id="contact">
            <SectionHeader
                title="Contact Me"
                subtitle="Let's collaborate on your next big project or event. I'm just a message away."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-primary text-white p-8 border-4 border-black dark:border-white neo-shadow-lg space-y-4">
                        <h3 className="text-4xl font-black uppercase tracking-tighter">Ready for Project</h3>
                        <p className="text-xl font-bold opacity-90">
                            I am currently open for freelance projects, speaking engagements, and training sessions.
                        </p>
                        <Badge className="bg-white text-black text-lg border-2 border-black font-black uppercase tracking-tighter py-1 px-4">
                            Available Now
                        </Badge>
                    </div>

                    <div className="space-y-4">
                        <p className="text-2xl font-black uppercase tracking-tighter">Quick Connect</p>
                        <Button asChild size="lg" className="h-16 w-full text-xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all bg-[#25D366] text-white hover:bg-[#25D366]">
                            <a href={personal.whatsapp} target="_blank" rel="noopener noreferrer">
                                WhatsApp Me <MessageSquare className="ml-2 w-6 h-6" />
                            </a>
                        </Button>
                    </div>
                </div>

                <Card className="border-4 border-black dark:border-white neo-shadow-lg bg-white dark:bg-black">
                    <CardHeader className="p-8">
                        <CardTitle className="text-3xl font-black uppercase tracking-tighter">Send an Email</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-lg font-black uppercase tracking-tighter">Name</label>
                                <Input
                                    {...form.register("name")}
                                    placeholder="Your Full Name"
                                    className="h-14 border-4 border-black dark:border-white focus:ring-0 focus:border-primary text-lg font-bold"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-destructive font-bold text-sm">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-lg font-black uppercase tracking-tighter">Email</label>
                                <Input
                                    {...form.register("email")}
                                    type="email"
                                    placeholder="your@email.com"
                                    className="h-14 border-4 border-black dark:border-white focus:ring-0 focus:border-primary text-lg font-bold"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-destructive font-bold text-sm">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-lg font-black uppercase tracking-tighter">Message</label>
                                <Textarea
                                    {...form.register("message")}
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="border-4 border-black dark:border-white focus:ring-0 focus:border-primary text-lg font-bold"
                                />
                                {form.formState.errors.message && (
                                    <p className="text-destructive font-bold text-sm">{form.formState.errors.message.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-16 text-xl font-black uppercase border-4 border-black dark:border-white neo-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
                            >
                                {isSubmitting ? (
                                    <>Sending... <Loader2 className="ml-2 w-6 h-6 animate-spin" /></>
                                ) : (
                                    <>Send Message <Send className="ml-2 w-6 h-6" /></>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
}
