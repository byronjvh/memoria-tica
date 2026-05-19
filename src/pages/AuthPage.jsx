// src/pages/AuthPage.jsx
import { Link, useSearchParams } from "react-router-dom";

import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import UpdatePasswordForm from "../components/auth/UpdatePasswordForm";

export default function AuthPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get("mode") || "signin";

    function changeMode(newMode) {
        setSearchParams({ mode: newMode });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-bg-main px-4">
            <section className="w-full max-w-md rounded-2xl border-2 border-border-main bg-text-light p-6 text-text-dark shadow-floating">
                <Link to="/" className="text-sm font-bold text-primary hover:brightness-125">
                    ← Volver
                </Link>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-text-muted">
                        Memoria Tica
                    </h2>

                    <h1 className="mt-2 text-3xl font-bold">
                        {mode === "signin" && "Iniciar sesión"}
                        {mode === "signup" && "Crear cuenta"}
                        {mode === "forgot-password" && "Recuperar contraseña"}
                        {mode === "update-password" && "Nueva contraseña"}
                    </h1>
                </div>

                <div className="mt-6">
                    {mode === "signin" && <SignInForm />}
                    {mode === "signup" && <SignUpForm />}
                    {mode === "forgot-password" && <ForgotPasswordForm />}
                    {mode === "update-password" && <UpdatePasswordForm />}
                </div>

                <div className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                    {mode !== "signin" && (
                        <button onClick={() => changeMode("signin")} className="text-left text-primary hover:brightness-125 cursor-pointer">
                            Ya tengo cuenta
                        </button>
                    )}

                    {mode !== "signup" && mode !== "update-password" && (
                        <button onClick={() => changeMode("signup")} className="text-left text-primary hover:brightness-125 cursor-pointer">
                            No tengo cuenta
                        </button>
                    )}

                    {mode !== "forgot-password" && mode !== "update-password" && (
                        <button onClick={() => changeMode("forgot-password")} className="text-left text-text-muted hover:brightness-125 cursor-pointer">
                            Olvidé mi contraseña
                        </button>
                    )}
                </div>
            </section>
        </main>
    );
}