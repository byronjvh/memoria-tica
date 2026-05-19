import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import IconButton from "./IconButton";
import { Logout, User, User2 } from "./Icons";

export default function SignOutDropdown({ text }) {
    const [hovered, setHovered] = useState(false)
    const { signOut, profile } = useAuth();

    return (
        <div className="relative " onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <IconButton hovered={hovered}>
                <User /> {text}
            </IconButton>

            <div className={`absolute top-full right-0 z-10 pt-1 overflow-hidden transition-all duration-100 ease-out ${hovered ? "h-auto opacity-100" : "h-0 opacity-0"}`}>
                <div className={`flex flex-col gap-1 items-start bg-text-light px-2 pb-2 pt-1.5 rounded-xl text-sm font-medium text-text-dark`}>
                    <div className="w-full px-0.5">
                        <span className="pb-1.5 px-1 mb-1.5 w-full inline-block text-text-muted/80 border-b border-text-muted/70 text-xs tracking-wide">@{profile?.username || "username"}</span>
                    </div>
                    <button className="text-primary flex gap-1 items-center text-nowrap pl-0.5 pr-1 py-0.5 hover:bg-text-muted/10 w-full text-left rounded-md cursor-pointer">
                        <span className="w-5 flex justify-center items-center">
                            <User2 size={16} className="text-primary" />
                        </span>
                        Editar perfil
                    </button>
                    <button onClick={signOut} className="text-primary flex gap-1 items-center text-nowrap pl-0.5 pr-1 py-0.5 hover:bg-text-muted/10 w-full text-left rounded-md cursor-pointer">
                        <span className="w-5 flex justify-center items-center">
                            <Logout size={16} className="text-primary" />
                        </span>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div >
    )
}