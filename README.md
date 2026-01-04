# Neobrutalist Portfolio - Rizqi Sarasajati

A production-ready personal portfolio website built with Next.js, Tailwind CSS, shadcn/ui, Contentful, and Supabase.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS (Neobrutalism Design)
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Data Source**: Contentful (Blogs & Testimonials)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma

## Prerequisites
- Node.js 18+
- Supabase Account
- Contentful Account

## Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="your-supabase-connection-string"
DIRECT_URL="your-supabase-direct-connection-string"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-supabase-key"

# Contentful
CONTENTFUL_SPACE_ID="your-space-id"
CONTENTFUL_ACCESS_TOKEN="your-access-token"
```

## Setup & Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup Prisma**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init_contact_submission
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Neobrutalism Styling
This project uses custom utility classes and design tokens in `src/app/globals.css` to achieve the Neobrutalist look:
- `neo-border`: Standard thick black/white borders.
- `neo-shadow`: Hard drop shadows without blur.
- `neo-shadow-lg`: Large hard drop shadows.
- `neo-shadow-primary`: Shadows using the primary blue color.

## Deployment to Vercel
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add all environment variables in the Vercel dashboard.
4. Deployment command: `npm run build`.

## Maintenance
To update the personal data, edit `src/data/portfolio.js`.
To manage blogs and testimonials, use the Contentful dashboard.
To view contact submissions, check the `ContactSubmission` table in Supabase.
