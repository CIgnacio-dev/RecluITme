import { useEffect, useState } from "react";

interface Application {
  offer_title: string;
  candidate_email: string;
  created_at: string;
}

export default function PostulacionesRecibidas() {
  const [applications, setApplications] = useState<Application[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3001/api/applications/received", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error al cargar postulaciones:", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Postulaciones Recibidas</h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">Aún no hay postulaciones.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-700">
                <strong>Oferta:</strong> {app.offer_title}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Candidato:</strong> {app.candidate_email}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Fecha:</strong> {new Date(app.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
