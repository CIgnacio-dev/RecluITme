import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOffer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modality, setModality] = useState("");
  const [contractType, setContractType] = useState("");
  const [seniority, setSeniority] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado.");
      return navigate("/login");
    }

    const offerData = {
      title,
      description,
      modality,
      contractType,
      seniority,
      specialty,
    };

    try {
      const res = await fetch("http://localhost:3001/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(offerData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + error.message);
        return;
      }

      alert("Oferta publicada correctamente.");
      navigate("/dashboard");
    } catch (err) {
      alert("Error al conectar con el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Publicar Oferta</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título del cargo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <select
            value={modality}
            onChange={(e) => setModality(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Modalidad</option>
            <option value="Remoto">Remoto</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
          </select>

          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Tipo de contrato</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
          </select>

          <select
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Seniority</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Junior</option>
            <option value="Semi-Senior">Semi-Senior</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>

          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
            className="w-full p-2 mb-6 border rounded"
          >
            <option value="">Especialidad</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
            <option value="UX/UI">UX/UI</option>
            <option value="QA">QA</option>
            <option value="DevOps">DevOps</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Publicar Oferta
          </button>
        </form>
      </div>
    </div>
  );
}
