export default function IconButton({ url, children, className = "" }) {
    const Component = url ? "a" : "button";

    return (
        <Component
            href={url}
            className={`flex gap-1 text-white font-medium cursor-pointer ${className}`}
        >
            {children}
        </Component>
    );
}