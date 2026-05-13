import IconButton from "./IconButton";
import { Diamond, Search, User } from "./Icons";

export default function Header() {
    return (
        <header>
            <div className='max-w-260 mx-auto py-4 px-2 flex justify-between'>
                <a href="/">
                    <h2 className='text-text-light text-xl'>
                        Memoria Tica
                    </h2>
                </a>
                <div className='flex gap-6'>
                    <IconButton>
                        <Search />Buscar
                    </IconButton>
                    <IconButton>
                        <Diamond /> Mis joyitas
                    </IconButton>
                    <IconButton>
                        <User />Byron
                    </IconButton>
                </div>
            </div>
        </header>
    )
}