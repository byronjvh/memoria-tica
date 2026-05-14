export default function IconButton({ url, children, className = "" }) {
    const Component = url ? "a" : "button";

    return (
        <Component
            href={url}
            className={`flex gap-1 px-3 py-2 transition-colors ease-out duration-300 border border-transparent hover:border-text-light-soft/40 hover:bg-text-light-soft/20 rounded-lg text-text-light font-medium cursor-pointer ${className}`}
        >
            {children}
        </Component>
    );
}