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

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[350px]">
                {blogs.map((blog, index) => {
                    const { title, tittle, slug, content, creator, cover } = blog.fields;
                    const isMain = index === 0;
                    const displayTitle = typeof tittle === 'string' ? tittle : (typeof title === 'string' ? title : 'Untitled Blog');

                    // Safe content preview extraction
                    let preview = "";
                    let fullText = "";

                    if (typeof content === 'string') {
                        fullText = content;
                    } else if (content?.content) {
                        // Extract text from Rich Text
                        fullText = content.content
                            .map(p => p.content?.map(t => t.value).join(''))
                            .join(' ');
                    }

                    if (fullText) {
                        preview = fullText.length > 20 ? fullText.substring(0, 20) + "..." : fullText;
                    }

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
                                    src={cover?.fields?.file?.url ? `https:${cover.fields.file.url}` : 'https://placehold.co/800x400?text=Blog+Cover'}
                                    alt={displayTitle}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white border-2 border-black px-3 py-1 neo-shadow font-black uppercase text-xs">
                                    {new Date(blog.sys.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col justify-between h-48">
                                <div>
                                    <h3 className={`font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors line-clamp-2 ${isMain ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                                        {displayTitle}
                                    </h3>
                                    <p className="mt-2 text-muted-foreground font-bold text-sm">
                                        {preview}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {typeof creator === 'object' && creator?.fields?.avatar?.fields?.file?.url ? (
                                            <div className="w-5 h-5 rounded-full overflow-hidden border border-black neo-shadow">
                                                <img
                                                    src={`https:${creator.fields.avatar.fields.file.url}`}
                                                    alt={creator.fields.creatorName || 'Author'}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <User className="w-3 h-3" />
                                        )}
                                        <span className="text-xs font-black uppercase opacity-50">
                                            {typeof creator === 'object' && creator?.fields?.creatorName
                                                ? creator.fields.creatorName
                                                : typeof creator === 'string' ? creator : 'Author'}
                                        </span>
                                    </div>
                                    <Link href={`/blogs/${slug}`} className="flex items-center gap-2 font-black uppercase text-xs hover:underline hover:text-primary">
                                        Read Story <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-16 text-center">
                <Button asChild size="lg" className="h-16 px-10 text-xl font-black uppercase border-4 border-black dark:border-white neo-shadow-lg neo-hover bg-white dark:bg-black text-black dark:text-white">
                    <Link href="/blogs">
                        View All Articles <ArrowRight className="ml-3 w-6 h-6" />
                    </Link>
                </Button>
            </div>
        </Container>
    );
}
