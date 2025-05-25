"use client";

import { useState } from "react";

export default function TestAirtable() {
  const [status, setStatus] = useState("");

  const sendTestData = async () => {
    const apiUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME}`;
    const token = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;

    const data = {
      records: [
        {
          fields: {
            Naam: "Test Gijs",
          },
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Airtable response:", result);
      setStatus("Gelukt!");
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error - check console.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Test Airtable</h1>
      <button onClick={sendTestData} className="bg-blue-500 text-white p-2 rounded">
        Stuur test data
      </button>
      <p className="mt-4">{status}</p>
    </main>
  );
}
