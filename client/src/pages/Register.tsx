import { useState } from "react";

export default function Register() {
  const [userType, setUserType] = useState("candidato");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const specialties = [
    "Frontend",
    "Backend",
    "Fullstack",
    "UX/UI",
    "Data Science",
    "DevOps",
    "QA",
    "Mobile",
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      email,
      password,
      userType,
    };

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + error.message);
        return;
      }

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "/login";
    } catch (err) {
      alert("Error de red al registrar");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        <form onSubmit={handleRegister}>
          {/* Selector de tipo de usuario */}
          <label className="block mb-2 text-sm font-medium">
            Tipo de usuario:
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 mb-1 border rounded"
          >
            <option value="empresa">🏢 Empresa</option>
            <option value="reclutador">👤 Reclutador</option>
            <option value="candidato">🧑‍💻 Candidato</option>
          </select>

          {/* Campos comunes */}
          <input
            type="text"
            placeholder="Nombre completo o nombre de usuario"
            className="w-full p-2 mb-4 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Descripción dinámica según tipo de usuario */}
          {userType === "empresa" && (
            <>
              <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-2 mb-4 text-sm rounded">
                <strong>🏢 Empresa:</strong> eres una organización que desea
                publicar ofertas directamente en nombre propio.
              </div>
              <input
                type="text"
                placeholder="Nombre de la empresa"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Rubro o industria"
                className="w-full p-2 mb-4 border rounded"
              />
            </>
          )}

          {userType === "reclutador" && (
            <>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 text-indigo-700 p-2 mb-4 text-sm rounded">
                <strong>👤 Reclutador:</strong> eres un profesional que publica
                ofertas y filtra candidatos para una o más empresas.
              </div>
              <input
                type="text"
                placeholder="Empresa/agencia para la que reclutas"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                placeholder="Cargo o posición"
                className="w-full p-2 mb-4 border rounded"
              />
            </>
          )}

          {userType === "candidato" && (
            <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-2 mb-4 text-sm rounded">
              <strong>🧑‍💻 Candidato:</strong> buscas empleo y deseas postularte a
              ofertas que se ajusten a tu perfil.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
