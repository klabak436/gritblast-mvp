export async function sendToAirtable(data) {
  const apiUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/${process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME}`;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;

  console.log("Sending data to Airtable:", data);
  console.log("API URL:", apiUrl);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: data,
        },
      ],
    }),
  });

  const result = await response.json();
  console.log("Airtable response:", result);

  return result;
}

export async function sendQuoteToAirtable(data) {
  const apiUrl = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/${process.env.NEXT_PUBLIC_AIRTABLE_QUOTE_TABLE_NAME}`;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: data,
        },
      ],
    }),
  });

  const result = await response.json();
  return result;
}

// Schrijven naar aparte tabel "CheckLogs"
export async function sendCheckLog(orderNumber) {
  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID; // Dit is je appV0Coqqwn4cALXc
  const tableName = "CheckLogs"; // Let op: exact zoals de tabel heet in Airtable

  const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  const record = {
    fields: {
      Bestelnummer: orderNumber,
    },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ records: [record] }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Airtable error response:", result);
    throw new Error(result.error?.message || "Fout bij loggen van check");
  }

  console.log("Check log opgeslagen in Airtable:", result);
  return result;
}

