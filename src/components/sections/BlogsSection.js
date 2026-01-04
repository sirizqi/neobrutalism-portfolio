import Link from "next/link";
import { getLatestBlogs } from "@/lib/contentful";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

export default async function BlogsSection() {
    const blogs = await getLatestBlogs(7);

    if (!blogs || blogs.length === 0) {
        return null;
    }

    return (
        <Container id="blogs">
            <SectionHeader
                title="Featured Blogs"
                subtitle="Exploring the intersections of product, software, and design thinking."
            />

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 auto-rows-[250px] md:auto-rows-[300px]">
                {blogs.map((blog, index) => {
                    const { title, slug, coverImage, creator } = blog.fields;
                    const isMain = index === 0;

                    return (
                        <div
                            key={blog.sys.id}
                            className={`border-4 border-black dark:border-white neo-shadow-lg bg-white dark:bg-black overflow-hidden flex flex-col group neo-hover shadow-none ${isMain
                                ? "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"
                                : index < 3
                                    ? "md:col-span-2 lg:col-span-3"
                                    : "md:col-span-2 lg:col-span-2"
                                }`}
                        >
                            <div className="relative flex-grow overflow-hidden border-b-4 border-black dark:border-white bg-secondary/10">
                                <img
                                    src={coverImage?.fields?.file?.url ? `https:${coverImage.fields.file.url}` : 'https://placehold.co/800x400?text=Blog+Cover'}
                                    alt={title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white border-2 border-black px-3 py-1 neo-shadow font-black uppercase text-xs">
                                    {new Date(blog.sys.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <h3 className={`font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors ${isMain ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
                                    {title}
                                </h3>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm font-black uppercase opacity-50">
                                        <User className="w-4 h-4" />
                                        {typeof creator === 'object' && creator?.fields?.name
                                            ? creator.fields.name
                                            : typeof creator === 'string' ? creator : 'Author'}
                                    </span>
                                    <Link href={`/blogs/${slug}`} className="flex items-center gap-2 font-black uppercase text-sm hover:underline hover:text-primary">
                                        Read Story <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-20 text-center">
                <Button asChild size="lg" className="h-20 px-12 text-2xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg neo-hover bg-white dark:bg-black text-black dark:text-white">
                    <Link href="/blogs">
                        View All Articles <ArrowRight className="ml-4 w-8 h-8" />
                    </Link>
                </Button>
            </div>
        </Container>
    );
}
