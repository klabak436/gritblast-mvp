"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
    coaten: "nee",
    ralKleur: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  // NIEUWE STATE VARIABELEN VOOR UPLOAD FEEDBACK
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle', 'uploading', 'success', 'error'
  const [uploadErrorMessage, setUploadErrorMessage] = useState(""); // Voor specifieke foutmeldingen bij upload

  const [blastPrice, setBlastPrice] = useState(0);
  const [coatPrice, setCoatPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState("form");
  const [orderCode, setOrderCode] = useState("");
  const [quoteLoaded, setQuoteLoaded] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("fromQuote")) {
      const stored = localStorage.getItem("quoteData");
      if (stored) {
        try {
          const data = JSON.parse(stored);
          if (data.formData) {
            setFormData((prev) => ({ ...prev, ...data.formData }));
          }
          if (data.photoUrl) setPhotoUrl(data.photoUrl);
          if (data.blastPrice) setBlastPrice(data.blastPrice);
          if (data.coatPrice) setCoatPrice(data.coatPrice);
          if (data.shippingCost) setShippingCost(data.shippingCost);
          if (data.totalPrice) setTotalPrice(data.totalPrice);
          setStep("quote");
          setQuoteLoaded(true);
        } catch (err) {
          console.error("Fout bij laden quoteData", err);
        }
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setPhotoFile(files[0]);
      setUploadStatus("idle"); // Reset status bij nieuwe bestandsselectie
      setUploadErrorMessage(""); // Reset foutmelding
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleUploadAndCalculate = async (e) => { // Naam gewijzigd voor duidelijkheid
    e.preventDefault();

    let finalUploadedUrl = ""; // Gebruik een tijdelijke variabele voor de URL
    setUploadStatus("idle"); // Reset status voordat upload begint

    if (photoFile) {
      setUploadStatus("uploading"); // Zet status op 'uploading'
      setUploadErrorMessage(""); // Reset foutmelding

      const formDataBlob = new FormData();
      formDataBlob.append("file", photoFile);

      try {
        const res = await fetch("/upload", { // Zorg dat de URL hier overeenkomt met je route.js
          method: "POST",
          body: formDataBlob,
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Upload server response error:", errorData);
          setUploadErrorMessage(errorData.details || errorData.error || "Upload mislukt.");
          setUploadStatus("error"); // Zet status op 'error'
          // Gooi een error zodat de rest van de handleSubmit niet doorgaat
          throw new Error("Foto upload mislukt."); 
        }

        const data = await res.json();
        if (data?.url) {
          console.log("Foto succesvol geüpload:", data.url);
          setPhotoUrl(data.url);
          finalUploadedUrl = data.url;
          setUploadStatus("success"); // Zet status op 'success'
        } else {
          console.error("Upload mislukt, geen URL in response:", data);
          setUploadErrorMessage("Upload mislukt: Server gaf geen geldige URL terug.");
          setUploadStatus("error"); // Zet status op 'error'
          throw new Error("Foto upload mislukt (geen URL).");
        }
      } catch (error) {
        console.error("Fout bij uploaden foto:", error);
        if (uploadStatus !== "error") { // Voorkom overschrijven als de error al gezet is
          setUploadErrorMessage(`Er ging iets mis: ${error.message || "Onbekende fout."}`);
          setUploadStatus("error");
        }
        return; // Stop de functie als de upload faalt
      }
    } else {
        // Als er geen bestand is geselecteerd, zorg dan dat de upload status schoon is
        setUploadStatus("idle"); 
        setUploadErrorMessage("");
    }

    // Nu de prijsberekening en overige formulierlogica
    const l = parseFloat(formData.length) / 100 || 0;
    const w = parseFloat(formData.width) / 100 || 0;
    const h = parseFloat(formData.height) / 100 || 0;
    const kg = parseFloat(formData.weight) || 0;

    let surface = ((l * w + w * h + l * h) * 2) || 0;
    surface = Math.max(surface, 0.1);

    const blast = Math.max(35, 25 * surface + (kg > 50 ? 25 : kg > 20 ? 10 : 0));
    let coat = 0;
    if (formData.coaten === "ja") {
      coat = 130 + 19.01 * surface;
    }

    const shipping = formData.pickup === "yes" ? 0 :
      (l * 100 <= 80 && w * 100 <= 50 && h * 100 <= 35 && kg <= 10 ? 15 :
      (l * 100 <= 175 && w * 100 <= 75 && h * 100 <= 55 && kg <= 20 ? 30 : 100));

    const total = (blast + coat + shipping).toFixed(2);

    setBlastPrice(blast.toFixed(2));
    setCoatPrice(coat.toFixed(2));
    setShippingCost(shipping);
    setTotalPrice(total);
    // Zorg ervoor dat photoUrl hier de uiteindelijke geüploade URL krijgt
    setPhotoUrl(finalUploadedUrl); 
    setStep("quote");
  };

  const handleConfirm = async () => {
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
      Coaten: formData.coaten,
      RAL_kleur: formData.ralKleur,
      Foto_url: photoUrl, // Deze URL komt nu van de succesvolle upload
      Stralen_prijs: String(blastPrice),
      Coaten_prijs: String(coatPrice),
      Verzendkosten: String(shippingCost),
      Totaalprijs: String(totalPrice),
      Referentiecode: code,
      Status: "Nog niet geaccepteerd, nog niet betaald",
    };

    try {
      console.log("Verstuur order naar Airtable:", record);
      await sendToAirtable(record);
      setStep("confirmation");
      if (typeof window !== "undefined") {
        localStorage.removeItem("quoteData");
      }
    } catch (error) {
      console.error("Fout bij verzenden naar Airtable:", error);
      alert("Er ging iets mis met het versturen van je order. Probeer later opnieuw.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Bestelling plaatsen</h1>

      <form onSubmit={quoteLoaded ? (e) => {e.preventDefault(); handleConfirm();} : handleUploadAndCalculate} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <label className="block text-lg font-medium text-gray-700">
          Naam:
          <input name="name" value={formData.name} onChange={handleChange} className="mt-1 border p-2 rounded w-full" required />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Telefoonnummer:
          <input name="phone" value={formData.phone} onChange={handleChange} className="mt-1 border p-2 rounded w-full" required />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          E-mail:
          <input name="email" value={formData.email} onChange={handleChange} className="mt-1 border p-2 rounded w-full" required />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Adres:
          <input name="address" value={formData.address} onChange={handleChange} className="mt-1 border p-2 rounded w-full" required />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Postcode:
          <input name="postcode" value={formData.postcode} onChange={handleChange} className="mt-1 border p-2 rounded w-full" required />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Stad:
          <input name="city" value={formData.city} onChange={handleChange} className="mt-1 border p-2 rounded w-full" required />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Bedrijf (optioneel):
          <input name="company" value={formData.company} onChange={handleChange} className="mt-1 border p-2 rounded w-full" />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          KVK (optioneel):
          <input name="kvk" value={formData.kvk} onChange={handleChange} className="mt-1 border p-2 rounded w-full" />
        </label>

        {!quoteLoaded && (
        <>
        {/* --- FOTO UPLOAD SECTIE MET FEEDBACK --- */}
        <div className="flex flex-col gap-2">
          <label className="block text-lg font-medium text-gray-700">
            Upload foto:
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="mt-2 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 cursor-pointer"
            />
          </label>

          {/* Dynamische feedback op basis van uploadStatus */}
          {uploadStatus === "idle" && photoFile && (
            <div className="p-2 bg-blue-100 text-blue-700 rounded-md shadow-sm text-sm">
              <p>Geselecteerd: <span className="font-semibold">{photoFile.name}</span> ({Math.round(photoFile.size / 1024)} KB)</p>
            </div>
          )}
          {uploadStatus === "uploading" && (
            <div className="p-2 bg-yellow-100 text-yellow-700 rounded-md shadow-sm text-sm flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Bestand wordt geüpload...</span>
            </div>
          )}
          {uploadStatus === "success" && photoUrl && (
            <div className="p-2 bg-green-100 text-green-700 rounded-md shadow-sm text-sm">
              <p className="font-semibold">Upload geslaagd!</p>
              {/* Optioneel: Afbeelding preview */}
              {photoFile && photoFile.type.startsWith('image/') && (
                <div className="mt-2">
                  <img src={photoUrl} alt="Geüploade afbeelding" className="max-w-full h-auto rounded-md border border-gray-300" />
                </div>
              )}
            </div>
          )}
          {uploadStatus === "error" && uploadErrorMessage && (
            <div className="p-2 bg-red-100 text-red-700 rounded-md shadow-sm text-sm">
              <p className="font-semibold">Upload mislukt!</p>
              <p>{uploadErrorMessage}</p>
            </div>
          )}
        </div>
        {/* --- EINDE FOTO UPLOAD SECTIE --- */}
        
        <label className="block text-lg font-medium text-gray-700">
          Beschrijving object:
          <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 border p-2 rounded w-full" rows="3" />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Lengte (cm):
          <input name="length" value={formData.length} onChange={handleChange} type="number" className="mt-1 border p-2 rounded w-full" />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Breedte (cm):
          <input name="width" value={formData.width} onChange={handleChange} type="number" className="mt-1 border p-2 rounded w-full" />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Hoogte (cm):
          <input name="height" value={formData.height} onChange={handleChange} type="number" className="mt-1 border p-2 rounded w-full" />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Gewicht (kg):
          <input name="weight" value={formData.weight} onChange={handleChange} type="number" className="mt-1 border p-2 rounded w-full" />
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Transport:
          <select name="pickup" value={formData.pickup} onChange={handleChange} className="mt-1 border p-2 rounded w-full">
            <option value="no">Ik wil verzenden</option>
            <option value="yes">Ik haal en breng zelf</option>
          </select>
        </label>
        <label className="block text-lg font-medium text-gray-700">
          Poedercoaten:
          <select name="coaten" value={formData.coaten} onChange={handleChange} className="mt-1 border p-2 rounded w-full">
            <option value="nee">Nee</option>
            <option value="ja">Ja</option>
          </select>
        </label>
        {formData.coaten === "ja" && (
          <label className="block text-lg font-medium text-gray-700">
            RAL Kleur:
            <input name="ralKleur" value={formData.ralKleur} onChange={handleChange} className="mt-1 border p-2 rounded w-full" />
          </label>
        )}

        <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-semibold transition duration-300">
          Bereken prijs
        </button>
        </>
        )}
      </form>

      {step === "quote" && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-lg text-center w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Prijsberekening</h2>
          <p className="text-lg mb-2"><strong>Stralen:</strong> €{blastPrice}</p>
          <p className="text-lg mb-2"><strong>Coaten:</strong> €{coatPrice}</p>
          <p className="text-lg mb-2"><strong>Verzendkosten:</strong> €{shippingCost}</p>
          <p className="text-2xl font-bold mt-4 text-blue-900"><strong>Totaalprijs:</strong> €{totalPrice}</p>
          <button onClick={handleConfirm} className="mt-6 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 font-semibold transition duration-300">
            Plaats bestelling
          </button>
        </div>
      )}

      {step === "confirmation" && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg shadow-lg text-center w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Bestelling Geplaatst!</h2>
          <p className="text-lg mb-2">Je referentiecode: <strong className="text-green-700">{orderCode}</strong></p>
          <p className="text-md mb-2">Status: Nog niet geaccepteerd, nog niet betaald</p>
          <p className="text-gray-600 text-sm mt-4">Je ontvangt een e-mail zodra je order is beoordeeld.</p>
        </div>
      )}
    </main>
  );
}