import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/knex.js";

export async function registerUser(req, res) {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: "Correo ya registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db("users")
      .insert({ email, password: hashedPassword, user_type: userType })
      .returning(["id", "email", "user_type"]);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("🔥 ERROR EN BACKEND:", error); // <-- Asegúrate de tener esta línea
    res.status(500).json({ message: "Error al registrar", error: error.message });
  }
}


export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, user: { email: user.email, userType: user.user_type } });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
}
