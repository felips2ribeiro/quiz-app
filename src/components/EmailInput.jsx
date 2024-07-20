import React, { useState } from 'react';
import { db, collection, addDoc} from './firebase/firebaseConfig';


export default function EmailInput({ onEmailTyped }) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [newEmail, setNewEmail] = useState(true)

  const validateEmail = (value) => {
    if (value.includes('@') && value.trim() !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        await addDoc(collection(db, 'users'), { email });
        onEmailTyped(email);
      } catch (error) {
        console.error("Erro ao adicionar o e-mail: ", error);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className={`block mb-2 text-black text-sm font-medium ${
            isValid === false ? 'text-red-700' : 'text-green-700'
          }`}
        >
          Digite seu e-mail
        </label>
        <input
          className={`p-4 border text-sm rounded-lg block w-full ${
            isValid === false
              ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
              : isValid === true
              ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500'
              : 'border-gray-300'
          }`}
          name="email"
          required
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        {isValid === true && (
          <p className="mt-2 text-sm text-green-600">
            <span className="font-medium"></span> Email válido.
          </p>
        )}
        {isValid === false && (
          <p className="mt-2 text-sm text-red-600">
            <span className="font-medium"></span> Email inválido.
          </p>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
