import db from "../db/knex.js";

export async function createOffer(req, res) {
  const {
    title,
    description,
    modality,
    contractType,
    seniority,
    specialty,
  } = req.body;

  const { id: userId, userType } = req.user;

  if (userType !== "empresa") {
    return res.status(403).json({ message: "Solo empresas pueden publicar ofertas." });
  }

  try {
    const [offer] = await db("offers")
      .insert({
        title,
        description,
        modality,
        contract_type: contractType,
        seniority,
        specialty,
        company_id: userId,
      })
      .returning("*");

    res.status(201).json(offer);
  } catch (error) {
    console.error("Error al crear oferta:", error);
    res.status(500).json({ message: "Error al crear la oferta" });
  }
}
export async function getAllOffers(req, res) {
  try {
    const offers = await db("offers")
      .join("users", "offers.company_id", "users.id")
      .select(
        "offers.id",
        "offers.title",
        "offers.description",
        "offers.modality",
        "offers.contract_type",
        "offers.seniority",
        "offers.specialty",
        "offers.created_at",
        "users.email as company_email"
      )
      .orderBy("offers.created_at", "desc");

    res.json(offers);
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    res.status(500).json({ message: "Error al obtener ofertas" });
  }
}

export async function getOfferById(req, res) {
  const { id } = req.params;

  try {
    const offer = await db("offers")
      .join("users", "offers.company_id", "users.id")
      .select(
        "offers.id",
        "offers.title",
        "offers.description",
        "offers.modality",
        "offers.contract_type",
        "offers.seniority",
        "offers.specialty",
        "offers.created_at",
        "users.email as company_email"
      )
      .where("offers.id", id)
      .first();

    if (!offer) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    res.json(offer);
  } catch (error) {
    console.error("Error al obtener oferta:", error);
    res.status(500).json({ message: "Error al obtener oferta" });
  }
}
