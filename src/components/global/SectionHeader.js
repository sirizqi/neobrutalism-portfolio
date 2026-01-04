export default function SectionHeader({ title, subtitle, className = "" }) {
    return (
        <div className={`mb-16 space-y-6 ${className}`}>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter inline-block bg-primary text-white px-6 py-4 border-4 border-black dark:border-white neo-shadow-lg leading-none">
                {title}
            </h2>
            {subtitle && (
                <p className="text-xl md:text-3xl font-bold bg-white dark:bg-black p-6 border-4 border-black dark:border-white neo-shadow-lg max-w-3xl leading-tight">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
