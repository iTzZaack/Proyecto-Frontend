import React from 'react';

export default function EventItem({ event, onRegister, onDelete }) {
  const isFull = event.attendees >= event.capacity;

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
          <span className="text-xs bg-indigo-100 text-indigo-800 font-semibold px-2.5 py-0.5 rounded-full">
            {event.category}
          </span>
        </div>
        <p className="text-sm text-gray-600">📅 Fecha: {event.date} | 📍 Lugar: {event.location}</p>
        <p className="text-sm font-semibold mt-1 text-gray-700">
          👥 Participantes: <span className={isFull ? "text-red-600 font-bold" : "text-green-600"}>{event.attendees} / {event.capacity}</span>
          {isFull && <span className="ml-2 text-xs text-red-500 font-bold">(CUPO LLENO)</span>}
        </p>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button
          onClick={() => onRegister(event.id)}
          disabled={isFull}
          className={`flex-1 md:flex-none px-4 py-2 text-sm rounded font-medium text-white transition ${
            isFull ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Registrar Participante
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}