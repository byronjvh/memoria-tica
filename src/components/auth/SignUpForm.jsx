// src/components/auth/SignUpForm.jsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    // verificar username
    const { data: existingUser, error: usernameError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .maybeSingle();

    if (usernameError) {
      setLoading(false);
      setErrorMessage("Error verificando el nombre de usuario.");
      return;
    }

    if (existingUser) {
      setLoading(false);
      setErrorMessage("Ese nombre de usuario ya está en uso.");
      return;
    }

    // signup
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          username,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage("Cuenta creada. Revisá tu correo para confirmar la cuenta.");
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
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg border border-border-dark-soft px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
      />

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-lg border border-border-dark-soft px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
      />

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
        className="rounded-lg bg-accent px-5 py-3 font-bold text-text-light hover:bg-accent-hover disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Creando cuenta..." : "Registrarme"}
      </button>
    </form>
  );
}