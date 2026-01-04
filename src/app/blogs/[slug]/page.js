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

    const { tittle, content, creator, cover } = blog.fields;

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
                            <div className="flex items-center gap-2 bg-secondary/20 p-1 pr-3 rounded-full border border-black dark:border-white neo-shadow-sm">
                                {typeof creator === 'object' && creator?.fields?.avatar?.fields?.file?.url ? (
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-black">
                                        <img
                                            src={`https:${creator.fields.avatar.fields.file.url}`}
                                            alt={creator.fields.creatorName || 'Author'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-black">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                                <div className="flex flex-col leading-none">
                                    <span className="text-xs font-black">
                                        {typeof creator === 'object' && creator?.fields?.creatorName
                                            ? creator.fields.creatorName
                                            : typeof creator === 'string' ? creator : 'Author'}
                                    </span>
                                    {typeof creator === 'object' && creator?.fields?.creatorJobTitle && (
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">
                                            {creator.fields.creatorJobTitle}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none p-6 border-8 border-black dark:border-white bg-white dark:bg-black neo-shadow-lg">
                            {typeof tittle === 'string' ? tittle : "Untitled Post"}
                        </h1>
                    </header>

                    <div className="border-8 border-black dark:border-white neo-shadow-lg overflow-hidden">
                        <img
                            src={cover?.fields?.file?.url ? `https:${cover.fields.file.url}` : 'https://placehold.co/1200x600?text=Blog+Cover'}
                            alt={tittle}
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

                        <div className="flex items-center gap-4 bg-white dark:bg-black border-4 border-black dark:border-white p-4 neo-shadow-lg">
                            {typeof creator === 'object' && creator?.fields?.avatar?.fields?.file?.url ? (
                                <div className="w-16 h-16 border-2 border-black dark:border-white neo-shadow">
                                    <img
                                        src={`https:${creator.fields.avatar.fields.file.url}`}
                                        alt={creator.fields.creatorName || 'Author'}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                                    />
                                </div>
                            ) : null}
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tighter leading-none">
                                    {typeof creator === 'object' && creator?.fields?.creatorName
                                        ? creator.fields.creatorName
                                        : typeof creator === 'string' ? creator : 'Author'}
                                </h4>
                                {typeof creator === 'object' && creator?.fields?.creatorJobTitle && (
                                    <p className="text-sm font-bold text-muted-foreground mt-1">
                                        {creator.fields.creatorJobTitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
