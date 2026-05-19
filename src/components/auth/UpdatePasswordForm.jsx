// src/components/auth/UpdatePasswordForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function UpdatePasswordForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const code = searchParams.get("code");

    const [password, setPassword] = useState("");
    const [loadingCode, setLoadingCode] = useState(Boolean(code));
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function exchangeCode() {
            if (!code) return;

            const { error } = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
                setErrorMessage(error.message);
            }

            setLoadingCode(false);
        }

        exchangeCode();
    }, [code]);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setErrorMessage("");

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        setMessage("Contraseña actualizada. Ya podés iniciar sesión.");

        setTimeout(() => {
            navigate("/auth?mode=signin");
        }, 1200);
    }

    if (loadingCode) {
        return <p className="text-text-muted">Validando enlace...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {message && (
                <p className="rounded-2xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700">
                    {message}
                </p>
            )}

            {errorMessage && (
                <p className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
                    {errorMessage}
                </p>
            )}

            <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-border-dark-soft px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                required
            />

            <button
                disabled={loading}
                className="rounded-lg bg-accent px-5 py-3 font-bold text-text-light hover:bg-accent-hover disabled:opacity-60 cursor-pointer"
            >
                {loading ? "Actualizando..." : "Actualizar contraseña"}
            </button>
        </form>
    );
}