import { useAuth } from "../context/AuthContext";
import IconButton from "./IconButton";
import { Diamond, Search, User } from "./Icons";

export default function Header() {
    const { user, profile } = useAuth()

    const username = profile?.name || "Visitante";
    return (
        <header>
            <div className='max-w-260 mx-auto py-4 px-2 flex justify-between rounded-lg items-center mb-4'>
                <a href="/">
                    <h2 className='text-text-light text-xl px-2'>
                        Memoria Tica
                    </h2>
                </a>
                <div className='flex gap-3'>
                    <IconButton>
                        <Search />Buscar
                    </IconButton>
                    <IconButton>
                        <Diamond /> Mis joyitas
                    </IconButton>
                    <IconButton>
                        <User />{username}
                    </IconButton>
                </div>
            </div>
        </header>
    )
}