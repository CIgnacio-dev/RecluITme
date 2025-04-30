import React from 'react';

const profiles = [
  {
    id: 1,
    name: 'María González',
    role: 'candidato',
    specialty: 'frontend',
    about: 'Frontend con 3 años de experiencia usando React.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Juan Pérez',
    role: 'reclutador',
    about: 'Buscando talentos para startups.',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Laura Castillo',
    role: 'candidato',
    specialty: 'ux/ui',
    about: 'Diseñadora enfocada en accesibilidad.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Pedro Martínez',
    role: 'reclutador',
    about: 'Contratando para soluciones SaaS.',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const Profiles: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Perfiles Públicos</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto items-stretch">


        {profiles.map((profile) => (
          <div
          key={profile.id}
          className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mb-4 shadow"
          />
          <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
          <p className={`text-sm font-medium mt-1 ${
            profile.role === 'candidato' ? 'text-blue-600' : 'text-green-600'
          }`}>
            {profile.role === 'candidato' ? '👤 Candidato' : '🏢 Reclutador'}
          </p>
          {profile.role === 'candidato' && profile.specialty && (
            <p className="text-sm mt-2 text-gray-700">
              <span className="font-semibold">Especialidad:</span>{' '}
              {capitalize(profile.specialty)}
            </p>
          )}
          {profile.about && (
            <p className="text-sm mt-3 text-gray-600">{profile.about}</p>
          )}
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Profiles;
