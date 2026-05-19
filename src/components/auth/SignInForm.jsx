// src/components/auth/SignInForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function SignInForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errorMessage && (
                <p className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
                    {errorMessage}
                </p>
            )}

            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-border-dark-soft px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                required
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-border-dark-soft px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                required
            />

            <button
                disabled={loading}
                className="rounded-lg bg-accent px-4 py-3 font-bold text-text-light hover:bg-accent-hover disabled:opacity-60 cursor-pointer"
            >
                {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
        </form>
    );
}