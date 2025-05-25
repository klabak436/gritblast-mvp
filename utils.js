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
