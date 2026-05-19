// src/components/auth/ForgotPasswordForm.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setErrorMessage("");

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth?mode=update-password`,
        });

        setLoading(false);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        setMessage("Te enviamos un enlace para cambiar la contraseña.");
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
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-border-dark-soft px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
                required
            />

            <button
                disabled={loading}
                className="rounded-lg bg-accent px-5 py-3 font-bold text-text-light hover:bg-accent-hover disabled:opacity-60 cursor-pointer"
            >
                {loading ? "Enviando..." : "Enviar enlace"}
            </button>
        </form>
    );
}