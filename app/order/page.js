"use client";

import Link from 'next/link';
import { useState } from "react";
import { sendToAirtable } from "../../utils";

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    company: "",
    kvk: "",
    description: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    pickup: "no",
  });
  const [price, setPrice] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [step, setStep] = useState("form");
  const [orderCode, setOrderCode] = useState("");
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const l = parseFloat(formData.length) || 0;
    const w = parseFloat(formData.width) || 0;
    const h = parseFloat(formData.height) || 0;
    const kg = parseFloat(formData.weight) || 0;

    const surface = ((l * w + w * h + l * h) * 2) / 10000;
    const workPrice = Math.max(35, 25 * surface + (kg > 50 ? 25 : kg > 20 ? 10 : 0)).toFixed(2);

    let shipping = 0;
    if (formData.pickup === "yes") {
      shipping = 0;
    } else if (l <= 80 && w <= 50 && h <= 35 && kg <= 10) {
      shipping = 15;
    } else if (l <= 175 && w <= 75 && h <= 55 && kg <= 20) {
      shipping = 30;
    } else {
      shipping = 100;
    }

    const total = (parseFloat(workPrice) + shipping).toFixed(2);

    setPrice(workPrice);
    setShippingCost(shipping);
    setTotalPrice(total);
    setQuoteGenerated(true);

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleConfirm = async (status) => {
    const code = "ORD" + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);

    const record = {
      Naam: formData.name,
      Telefoonnummer: formData.phone,
      Email: formData.email,
      Adres: formData.address,
      Postcode: formData.postcode,
      Stad: formData.city,
      Bedrijf: formData.company,
      KVK: formData.kvk,
      Omschrijving: formData.description,
      Lengte_cm: formData.length,
      Breedte_cm: formData.width,
      Hoogte_cm: formData.height,
      Gewicht_kg: formData.weight,
      Transport: formData.pickup,
      Stralen_prijs: String(price),
      Verzendkosten: String(shippingCost),
      Totaalprijs: String(totalPrice),
      Referentiecode: code,
      Status: status,
    };

    try {
      const result = await sendToAirtable(record);
      console.log("Airtable response:", result);
      if (status === "Nog niet geaccepteerd, nog niet betaald") {
        setStep("confirmation");
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Fout bij verzenden naar Airtable:", error);
      alert("Er ging iets mis met het versturen van je order. Probeer later opnieuw.");
    }
  };
  const handleBack = async () => {
  const code = "ORD" + Math.floor(100000 + Math.random() * 900000);
  setOrderCode(code);

  const record = {
    Naam: formData.name,
    Telefoonnummer: formData.phone,
    Email: formData.email,
    Adres: formData.address,
    Postcode: formData.postcode,
    Stad: formData.city,
    Bedrijf: formData.company,
    KVK: formData.kvk,
    Omschrijving: formData.description,
    Lengte_cm: formData.length,
    Breedte_cm: formData.width,
    Hoogte_cm: formData.height,
    Gewicht_kg: formData.weight,
    Transport: formData.pickup,
    Stralen_prijs: String(price),
    Verzendkosten: String(shippingCost),
    Totaalprijs: String(totalPrice),
    Referentiecode: code,
    Status: "Niet doorgezet",
  };

  try {
    const result = await sendToAirtable(record);
    console.log("Order afgebroken, gelogd in Airtable:", result);
    // Terug naar home:
    window.location.href = "/";
  } catch (error) {
    console.error("Fout bij loggen van afgebroken order:", error);
    alert("Er ging iets mis met het loggen van je actie. Probeer later opnieuw.");
  }
};

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      {step !== "confirmation" && (
        <h1 className="text-4xl font-bold mb-4">Bestelling plaatsen</h1>
      )}

      {step === "form" && (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-gray-50 p-4 rounded shadow">
            <label>Naam:<input name="name" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Telefoon:<input name="phone" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>E-mail:<input name="email" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Adres:<input name="address" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Postcode:<input name="postcode" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Stad:<input name="city" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Bedrijf (optioneel):<input name="company" onChange={handleChange} className="border p-2 rounded w-full" /></label>
            <label>KVK (optioneel):<input name="kvk" onChange={handleChange} className="border p-2 rounded w-full" /></label>
            <label>Upload foto (verplicht):<input type="file" className="border p-2 rounded w-full" required /></label>
            <label>Beschrijving werkstuk en gewenst resultaat:<textarea name="description" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Lengte (cm):<input name="length" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Breedte (cm):<input name="width" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Hoogte (cm):<input name="height" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Gewicht (kg):<input name="weight" onChange={handleChange} className="border p-2 rounded w-full" required /></label>
            <label>Transport:<select name="pickup" onChange={handleChange} className="border p-2 rounded w-full">
              <option value="no">Ik wil verzenden</option>
              <option value="yes">Ik haal en breng zelf</option>
            </select></label>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Bereken prijs
            </button>
          </form>
        </>
      )}

      {quoteGenerated && step === "form" && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold mb-4">Prijsindicatie</h2>
          <p>Stralen: <strong>€{price}</strong></p>
          <p>Verzendkosten: <strong>€{shippingCost}</strong></p>
          <p>Totaalprijs: <strong>€{totalPrice}</strong></p>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleConfirm("Niet doorgezet")}
              className="bg-gray-300 p-2 rounded hover:bg-gray-400"
            >
              Terug naar home
            </button>
            <button
              onClick={() => handleConfirm("Nog niet geaccepteerd, nog niet betaald")}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Plaats bestelling
            </button>
          </div>
        </div>
      )}

      {step === "confirmation" && (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Je referentiecode: <strong>{orderCode}</strong></p>
          <p className="mt-4">We sturen je een e-mail ter bevestiging van je aanvraag.</p>
          <p>Als je order wordt geaccepteerd, ontvang je een betaalverzoek en verzendinstructies.</p>
          <p className="mt-4 text-yellow-600">Status: Nog niet geaccepteerd, nog niet betaald.</p>
          <Link href="/" className="mt-4 inline-block text-blue-500 underline">Terug naar home</Link>
        </div>
      )}
    </main>
  );
}
