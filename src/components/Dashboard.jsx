import React from 'react';

export default function Dashboard() {
  return (
    <div className="bg-white p-10 rounded-xl shadow-lg">
      <h1 className="text-3xl mb-4">Seus Quizzes</h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Criar Quiz
      </button>
    </div>
  );
}
