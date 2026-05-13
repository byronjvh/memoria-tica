export default function PrimaryButton({ children, className }) {
    return (
        <button className={
            `w-max hover:bg-accent-hover text-sm 
            flex items-center gap-1 font-bold px-4 
            py-3 bg-accent rounded-lg uppercase 
            cursor-pointer border-2 
            border-border-main text-text-light 
            hover:-translate-y-0.5 transition 
            duration-200 ease-out ${className}
            `}>
            {children}
        </button>
    )
}