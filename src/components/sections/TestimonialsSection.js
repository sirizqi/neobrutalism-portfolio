import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { getTestimonials } from "@/lib/contentful";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function TestimonialsSection() {
    const testimonials = await getTestimonials();

    return (
        <Container id="testimonials" className="bg-primary/5 dark:bg-primary/10 overflow-hidden">
            <SectionHeader
                title="Testimonials"
                subtitle="Some people who have worked with me and their comments regarding my performance"
            />

            {testimonials && testimonials.length > 0 ? (
                <TestimonialsCarousel testimonials={testimonials} />
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
