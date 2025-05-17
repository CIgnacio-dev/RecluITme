import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

export default function Ofertas() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [specialty, setSpecialty] = useState("");
  const [seniority, setSeniority] = useState("");
  const [modality, setModality] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/offers")
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        setFilteredOffers(data);
      })
      .catch((err) => {
        console.error("Error al cargar ofertas:", err);
      });
  }, []);

  useEffect(() => {
    const filtered = offers.filter((offer) => {
      return (
        (specialty === "" || offer.specialty === specialty) &&
        (seniority === "" || offer.seniority === seniority) &&
        (modality === "" || offer.modality === modality)
      );
    });
    setFilteredOffers(filtered);
  }, [specialty, seniority, modality, offers]);

  return (
    
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Ofertas Disponibles</h1>

      {/* Filtros */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Especialidad</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
          <option>UX/UI</option>
          <option>QA</option>
          <option>DevOps</option>
        </select>

        <select
          value={seniority}
          onChange={(e) => setSeniority(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Seniority</option>
          <option>Trainee</option>
          <option>Junior</option>
          <option>Semi-Senior</option>
          <option>Senior</option>
          <option>Lead</option>
        </select>

        <select
          value={modality}
          onChange={(e) => setModality(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Modalidad</option>
          <option>Remoto</option>
          <option>Presencial</option>
          <option>Híbrido</option>
        </select>
      </div>

      {/* Resultados */}
      {filteredOffers.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron ofertas con esos filtros.</p>
      ) : (
        <div className="grid gap-4">
          {filteredOffers.map((offer) => (
            <Link
  key={offer.id}
  to={`/ofertas/${offer.id}`}
  className="bg-white p-4 rounded shadow block hover:bg-gray-50 transition"
>
              <h2 className="text-lg font-semibold">{offer.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Publicado por: <span className="font-medium">{offer.company_email}</span>
              </p>
              <p className="mb-2">{offer.description}</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Especialidad:</strong> {offer.specialty}</p>
                <p><strong>Seniority:</strong> {offer.seniority}</p>
                <p><strong>Modalidad:</strong> {offer.modality}</p>
                <p><strong>Contrato:</strong> {offer.contract_type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
