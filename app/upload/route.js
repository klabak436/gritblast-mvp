import { put } from "@vercel/blob";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.error("Server: No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("Server: Ontvangen bestand naam:", file.name);
    console.log("Server: Ontvangen bestand type:", file.type);
    console.log("Server: Ontvangen bestand grootte:", file.size);

    // DEZE LIJN MOET WORDEN AANGEPAST
    const blob = await put(file.name, file.stream(), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true, // <-- VOEG DEZE REGEL TOE
    });

    console.log("Server: Blob geüpload (response van Vercel Blob):", blob);

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Server: Fout bij uploaden naar Vercel Blob:", error);
    // Stuur een duidelijke foutmelding terug naar de client
    return NextResponse.json({ error: "Failed to upload file", details: error.message }, { status: 500 });
  }
}