import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Offer {
  id: number;
  title: string;
  description: string;
  modality: string;
  contract_type: string;
  seniority: string;
  specialty: string;
  company_email: string;
}

export default function OfertaDetalle() {
  const { id } = useParams();
  const [offer, setOffer] = useState<Offer | null>(null);
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:3001/api/offers/${id}`)
      .then((res) => res.json())
      .then((data) => setOffer(data))
      .catch((err) => console.error("Error al cargar la oferta:", err));
  }, [id]);

  const postular = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ offerId: id }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + err.message);
        return;
      }

      alert("Postulación enviada correctamente.");
    } catch (error) {
      alert("Error al postular");
      console.error(error);
    }
  };

  if (!offer) return <div className="p-6 text-center">Cargando oferta...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{offer.title}</h1>
      <p className="text-gray-600 mb-4">Empresa: {offer.company_email}</p>
      <p className="mb-4">{offer.description}</p>
      <ul className="text-sm text-gray-700 space-y-1 mb-6">
        <li><strong>Especialidad:</strong> {offer.specialty}</li>
        <li><strong>Seniority:</strong> {offer.seniority}</li>
        <li><strong>Modalidad:</strong> {offer.modality}</li>
        <li><strong>Contrato:</strong> {offer.contract_type}</li>
      </ul>

      {userType === "candidato" && (
        <button
          onClick={postular}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Postularme
        </button>
      )}
    </div>
  );
}
