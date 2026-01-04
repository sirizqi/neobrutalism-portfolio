export default function Container({ children, className = "", id }) {
    return (
        <section id={id} className={`py-32 px-6 md:px-12 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
}
