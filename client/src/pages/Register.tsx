import React, { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'candidato' | 'reclutador'>('candidato');
  const [specialty, setSpecialty] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (role === 'candidato' && !specialty) {
      alert('Por favor selecciona tu especialidad.');
      return;
    }

    const userData = {
      name,
      email,
      password,
      role,
      ...(role === 'candidato' && { specialty, about }),
    };

    console.log('Usuario registrado:', userData);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        <label className="block mb-2">Nombre completo</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Tipo de cuenta</label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="candidato"
              checked={role === 'candidato'}
              onChange={() => setRole('candidato')}
              className="mr-2"
            />
            Candidato
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="reclutador"
              checked={role === 'reclutador'}
              onChange={() => setRole('reclutador')}
              className="mr-2"
            />
            Reclutador
          </label>
        </div>

        {/* Campos adicionales si es candidato */}
        {role === 'candidato' && (
          
           
  <>
    <label className="block mb-2">Especialidad</label>
    <select
      value={specialty}
      onChange={(e) => setSpecialty(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
    >
      <option value="">Selecciona una opción</option>
      {[
        "Frontend",
        "Backend",
        "Fullstack",
        "DevOps",
        "QA",
        "UX/UI",
        "Mobile",
        "Data Engineer",
        "Data Scientist",
        "AI/ML",
        "Cloud",
        "Game Developer",
        "Security",
        "Otro",
      ].map((option) => (
        <option key={option} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>

    <label className="block mb-2">Sobre ti (opcional)</label>
    <textarea
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      className="w-full p-2 mb-4 border rounded resize-none"
      rows={3}
      placeholder="En pocas palabras para mostrar bajo tu perfil"
    />
  </>
)}


           
         
        

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
