import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("userType");
    const mail = localStorage.getItem("email");

    if (!token || !type || !mail) {
      navigate("/login");
    } else {
      setUserType(type);
      setEmail(mail);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Bienvenido/a, {email}
        </h1>

        {userType === "empresa" && (
          <p className="text-center text-gray-700">
            Aquí puedes crear y administrar tus ofertas laborales.
          </p>
        )}

        {userType === "reclutador" && (
          <p className="text-center text-gray-700">
            Accede a los perfiles de candidatos y administra postulaciones.
          </p>
        )}

        {userType === "candidato" && (
          <p className="text-center text-gray-700">
            Explora las ofertas disponibles y postúlate fácilmente.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
