import db from "../db/knex.js";

export async function applyToOffer(req, res) {
  const userId = req.user.id;
  const userType = req.user.userType;
  const { offerId } = req.body;

  if (userType !== "candidato") {
    return res.status(403).json({ message: "Solo candidatos pueden postular." });
  }

  try {
    const alreadyApplied = await db("applications")
      .where({ user_id: userId, offer_id: offerId })
      .first();

    if (alreadyApplied) {
      return res.status(409).json({ message: "Ya te has postulado a esta oferta." });
    }

    await db("applications").insert({
      user_id: userId,
      offer_id: offerId,
    });

    res.status(201).json({ message: "Postulación enviada con éxito" });
  } catch (error) {
    console.error("Error al postular:", error);
    res.status(500).json({ message: "Error al postular" });
  }
}

export async function getMyApplications(req, res) {
  const { id: userId, userType } = req.user;

  if (userType !== "candidato") {
    return res.status(403).json({ message: "Solo candidatos pueden ver sus postulaciones." });
  }

  try {
    const applications = await db("applications")
      .join("offers", "applications.offer_id", "offers.id")
      .join("users", "offers.company_id", "users.id")
      .where("applications.user_id", userId)
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
      .orderBy("applications.created_at", "desc");

    res.json(applications);
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    res.status(500).json({ message: "Error al obtener tus postulaciones" });
  }
}

export async function getReceivedApplications(req, res) {
  const { id: userId, userType } = req.user;

  if (userType !== "reclutador") {
    return res.status(403).json({ message: "Solo reclutadores pueden acceder a esto." });
  }

  try {
    const applications = await db("applications")
      .join("offers", "applications.offer_id", "offers.id")
      .join("users as candidates", "applications.user_id", "candidates.id")
      .join("users as empresas", "offers.company_id", "empresas.id")
      .where("empresas.id", userId)
      .select(
        "offers.title as offer_title",
        "candidates.email as candidate_email",
        "applications.created_at"
      )
      .orderBy("applications.created_at", "desc");

    res.json(applications);
  } catch (error) {
    console.error("Error al obtener postulaciones recibidas:", error);
    res.status(500).json({ message: "Error al obtener postulaciones" });
  }
}
