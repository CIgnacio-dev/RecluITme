import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  description: string;
  modality: string;
  contract_type: string;
  seniority: string;
  specialty: string;
  created_at: string;
  company_email: string;
}

export default function MisPostulaciones() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3001/api/applications/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error("Error al cargar postulaciones:", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Mis Postulaciones</h1>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">Aún no te has postulado a ninguna oferta.</p>
      ) : (
        <div className="grid gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{offer.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Empresa: {offer.company_email}
              </p>
              <p className="mb-2">{offer.description}</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Especialidad:</strong> {offer.specialty}</p>
                <p><strong>Seniority:</strong> {offer.seniority}</p>
                <p><strong>Modalidad:</strong> {offer.modality}</p>
                <p><strong>Contrato:</strong> {offer.contract_type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
