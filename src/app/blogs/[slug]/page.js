import Link from "next/link";
import { getBlogBySlug } from "@/lib/contentful";
import Container from "@/components/global/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BlogDetailPage(props) {
    const params = await props.params;
    const { slug } = params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const { title, content, creator, coverImage } = blog.fields;

    return (
        <main className="min-h-screen pt-20">
            <Container>
                <div className="max-w-4xl mx-auto space-y-12">
                    <Button asChild variant="outline" className="border-4 border-black dark:border-white neo-shadow font-black uppercase hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white dark:bg-black">
                        <Link href="/blogs">
                            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Blogs
                        </Link>
                    </Button>

                    <header className="space-y-6">
                        <div className="flex flex-wrap items-center gap-6 text-sm font-black uppercase text-muted-foreground">
                            <span className="flex items-center gap-1 bg-primary text-white border-2 border-black px-3 py-1 neo-shadow">
                                <Calendar className="w-4 h-4" /> {new Date(blog.sys.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {typeof creator === 'object' && creator?.fields?.name
                                    ? creator.fields.name
                                    : typeof creator === 'string' ? creator : 'Author'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none p-6 border-8 border-black dark:border-white bg-white dark:bg-black neo-shadow-lg">
                            {typeof title === 'string' ? title : "Untitled Post"}
                        </h1>
                    </header>

                    <div className="border-8 border-black dark:border-white neo-shadow-lg overflow-hidden">
                        <img
                            src={coverImage?.fields?.file?.url ? `https:${coverImage.fields.file.url}` : 'https://placehold.co/1200x600?text=Blog+Cover'}
                            alt={title}
                            className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <article className="prose prose-2xl dark:prose-invert max-w-none font-bold leading-relaxed space-y-8 bg-white dark:bg-black border-4 border-black dark:border-white p-8 md:p-12 neo-shadow">
                        <div className="whitespace-pre-wrap">
                            {typeof content === 'string'
                                ? content
                                : content?.content?.map(p => p.content?.map(t => t.value).join('')).join('\n\n') || "No content available."}
                        </div>
                    </article>

                    <div className="flex justify-between items-center py-12 border-t-8 border-black dark:border-white">
                        <div className="space-y-4">
                            <p className="text-xl font-black uppercase tracking-tighter">Share this article</p>
                            <div className="flex gap-4">
                                {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
                                    <Button key={social} variant="outline" className="border-2 border-black dark:border-white neo-shadow font-black uppercase">
                                        {social}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Badge className="bg-primary text-white border-2 border-black text-xl px-6 py-2 neo-shadow font-black uppercase">
                            {typeof creator === 'object' && creator?.fields?.name
                                ? creator.fields.name
                                : typeof creator === 'string' ? creator : 'Author'}
                        </Badge>
                    </div>
                </div>
            </Container>
        </main>
    );
}
