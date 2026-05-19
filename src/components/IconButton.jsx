import { Link } from "react-router-dom";

export default function IconButton({ url, children, className = "", hovered }) {
    const newClassName = hovered
        ? `flex gap-1 px-3 py-2 transition-colors ease-out duration-300 border border-text-light-soft/40 bg-text-light-soft/20 rounded-lg text-text-light font-medium cursor-pointer ${className}`
        : `flex gap-1 px-3 py-2 transition-colors ease-out duration-300 border border-transparent hover:border-text-light-soft/40 hover:bg-text-light-soft/20 rounded-lg text-text-light font-medium cursor-pointer ${className}`
    if (url) return (
        <Link
            to={url}
            className={newClassName}
        >
            {children}
        </Link>
    )

    return (
        <button
            className={newClassName}
        >
            {children}
        </button>
    );
}