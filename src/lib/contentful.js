import { createClient } from "contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
});

export async function getLatestBlogs(limit = 7) {
    if (!SPACE_ID || !ACCESS_TOKEN) return [];

    try {
        const res = await client.getEntries({
            content_type: 'blogs',
            order: '-sys.createdAt',
            limit,
            include: 3,
        });
        return res.items;
    } catch (error) {
        console.error("Error fetching latest blogs:", error);
        return [];
    }
}

export async function getBlogsPage(page = 1, pageSize = 20, query = "") {
    if (!SPACE_ID || !ACCESS_TOKEN) return { items: [], total: 0 };

    const skip = (page - 1) * pageSize;
    const params = {
        content_type: 'blogs',
        order: '-sys.createdAt',
        limit: pageSize,
        skip,
        include: 3,
    };
    if (query) {
        params['query'] = query;
    }

    try {
        const res = await client.getEntries(params);
        return { items: res.items, total: res.total };
    } catch (error) {
        console.error("Error fetching blogs page:", error);
        return { items: [], total: 0 };
    }
}

export async function getBlogBySlug(slug) {
    if (!SPACE_ID || !ACCESS_TOKEN) return null;

    try {
        const res = await client.getEntries({
            content_type: 'blogs',
            'fields.slug': slug,
            limit: 1,
            include: 3,
        });
        return res.items.length > 0 ? res.items[0] : null;
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
        return null;
    }
}

export async function getTestimonials() {
    if (!SPACE_ID || !ACCESS_TOKEN) return [];

    try {
        const res = await client.getEntries({
            content_type: 'testimonials',
            order: '-sys.createdAt',
            include: 3,
        });
        return res.items;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}
