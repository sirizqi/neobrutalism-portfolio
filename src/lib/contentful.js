const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

async function contentfulFetch(query) {
    if (!SPACE_ID || !ACCESS_TOKEN) {
        console.warn("Contentful credentials missing. Returning empty data.");
        return null;
    }

    const res = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&${query}`,
        { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data from Contentful");
    }

    return res.json();
}

export async function getLatestBlogs(limit = 7) {
    const data = await contentfulFetch(`content_type=blogs&order=-sys.createdAt&limit=${limit}`);
    return data ? data.items : [];
}

export async function getBlogsPage(page = 1, pageSize = 20, query = "") {
    const skip = (page - 1) * pageSize;
    let q = `content_type=blogs&order=-sys.createdAt&limit=${pageSize}&skip=${skip}`;
    if (query) {
        q += `&query=${encodeURIComponent(query)}`;
    }
    const data = await contentfulFetch(q);
    return data ? { items: data.items, total: data.total } : { items: [], total: 0 };
}

export async function getBlogBySlug(slug) {
    const data = await contentfulFetch(`content_type=blogs&fields.slug=${slug}&limit=1`);
    return data && data.items.length > 0 ? data.items[0] : null;
}

export async function getTestimonials() {
    const data = await contentfulFetch(`content_type=testimonials&order=-sys.createdAt`);
    return data ? data.items : [];
}
