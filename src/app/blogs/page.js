import Link from "next/link";
import { getBlogsPage } from "@/lib/contentful";
import Container from "@/components/global/Container";
import SectionHeader from "@/components/global/SectionHeader";
import CommandKSearch from "@/components/global/CommandKSearch";
import Pagination from "@/components/global/Pagination";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

export default async function BlogsPage({ searchParams }) {
    const page = parseInt(searchParams.page) || 1;
    const query = searchParams.q || "";
    const pageSize = 20;

    const { items: blogs, total } = await getBlogsPage(page, pageSize, query);

    return (
        <main className="min-h-screen pt-20">
            <Container>
                <SectionHeader
                    title="Blogs"
                    subtitle="Explore my latest thoughts on product, design, and tech. Use Cmd+K to search."
                />

                <div className="mb-12">
                    <CommandKSearch blogs={blogs} />
                </div>

                {blogs && blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => {
                            const { title, slug, content, creator, coverImage } = blog.fields;

                            // Safe content preview extraction
                            let preview = "Read more...";
                            if (typeof content === 'string') {
                                preview = content.substring(0, 80);
                            } else if (content?.content) {
                                // Extract text from Rich Text
                                const text = content.content
                                    .map(p => p.content?.map(t => t.value).join(''))
                                    .join(' ');
                                preview = text.substring(0, 80);
                            }

                            return (
                                <Card key={blog.sys.id} className="border-4 border-black dark:border-white neo-shadow bg-white dark:bg-black overflow-hidden flex flex-col group transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                                    <div className="relative h-48 overflow-hidden border-b-4 border-black dark:border-white">
                                        <img
                                            src={coverImage?.fields?.file?.url ? `https:${coverImage.fields.file.url}` : 'https://placehold.co/800x400?text=Blog+Cover'}
                                            alt={title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>

                                    <CardHeader className="p-6">
                                        <div className="flex items-center gap-4 text-xs font-black uppercase text-muted-foreground mb-2">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.sys.createdAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {typeof creator === 'object' && creator?.fields?.name
                                                    ? creator.fields.name
                                                    : typeof creator === 'string' ? creator : 'Author'}
                                            </span>
                                        </div>
                                        <CardTitle className="text-2xl font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                                            {typeof title === 'string' ? title : 'Untitled Blog'}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="px-6 pb-6 flex-grow text-muted-foreground font-bold line-clamp-2">
                                        {preview}...
                                    </CardContent>

                                    <CardFooter className="p-6 pt-0 mt-auto">
                                        <Button asChild className="w-full border-2 border-black dark:border-white neo-shadow font-black uppercase hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                            <Link href={`/blogs/${slug}`}>
                                                Read More <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-20 text-center border-4 border-dashed border-black dark:border-white bg-white dark:bg-black">
                        <h3 className="text-3xl font-black uppercase tracking-tighter opacity-50">No articles found.</h3>
                    </div>
                )}

                <Pagination total={total} current={page} pageSize={pageSize} />
            </Container>
        </main>
    );
}
