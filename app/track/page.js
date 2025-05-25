"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: geen echte data
    setStatusMessage("Bestelling niet gevonden. Controleer je gegevens of probeer het later opnieuw.");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Bestelling volgen</h1>
      <p className="text-lg mb-6 text-center">Vul je bestelnummer en postcode in om de status van je bestelling te bekijken.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-gray-50 p-4 rounded shadow">
        <label>
          Bestelnummer:
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Bijv. 123456"
          />
        </label>

        <label>
          Postcode:
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Bijv. 1234AB"
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Check status
        </button>
      </form>

      {statusMessage && (
        <p className="mt-4 text-red-500">{statusMessage}</p>
      )}
    </main>
  );
}
