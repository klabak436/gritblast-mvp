"use client";

import { useState } from "react";
import { sendCheckLog } from "../../utils"; // importeer functie om log te schrijven

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setStatusMessage("Voer een geldig bestelnummer in.");
      return;
    }

    // Schrijf het bestelnummer naar Airtable
    try {
      await sendCheckLog(orderNumber);
    } catch (error) {
      console.error("Fout bij opslaan in Airtable:", error);
    }

    setStatusMessage("Bestelling is nog niet geaccepteerd.");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Bestelling volgen</h1>
      <p className="text-lg mb-6 text-center">Vul je bestelnummer in om de status te bekijken.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-gray-50 p-4 rounded shadow">
        <label>
          Bestelnummer:
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Bijv. ORD123456"
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Check status
        </button>
      </form>

      {statusMessage && (
        <p className="mt-4 text-green-600">{statusMessage}</p>
      )}
    </main>
  );
}
