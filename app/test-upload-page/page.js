"use client";

import { useState } from "react";

export default function TestUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // 'idle', 'uploading', 'success', 'error'
  const [fileUrl, setFileUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Voor gedetailleerde foutmeldingen

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus("idle"); // Reset status bij nieuwe bestandsselectie
      setErrorMessage("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Selecteer eerst een bestand.");
      return;
    }

    setUploadStatus("uploading");
    setErrorMessage("");
    setFileUrl(""); // Reset URL

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Zorg dat de URL overeenkomt met je route.js bestandslocatie.
      // Als je route.js in app/upload/route.js staat, gebruik dan "/upload"
      // Als je route.js in app/api/upload/route.js staat, gebruik dan "/api/upload"
      const response = await fetch("/upload", { // Aangepast naar "/upload"
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Lees de response body om meer details over de fout te krijgen
        const errorData = await response.json();
        console.error("Upload server response error:", errorData);
        throw new Error(errorData.details || errorData.error || "Upload mislukt.");
      }

      const data = await response.json();

      if (data?.url) {
        console.log("Bestand succesvol geüpload:", data.url);
        setFileUrl(data.url);
        setUploadStatus("success");
        setSelectedFile(null); // Reset geselecteerd bestand na succesvolle upload
      } else {
        console.error("Upload mislukt: Geen URL in response", data);
        setErrorMessage("Upload mislukt: Server gaf geen geldige URL terug.");
        setUploadStatus("error");
      }
    } catch (error) {
      console.error("Fout bij uploaden:", error);
      setErrorMessage(`Er ging iets mis: ${error.message || "Onbekende fout."}`);
      setUploadStatus("error");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Test Bestand Uploaden</h1>

      <form onSubmit={handleUpload} className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Selecteer een bestand:
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 cursor-pointer"
            required
          />
        </label>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-md text-white font-semibold transition duration-300
                      ${uploadStatus === "uploading" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                      ${!selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={uploadStatus === "uploading" || !selectedFile}
        >
          {uploadStatus === "uploading" ? "Bezig met uploaden..." : "Bestand Uploaden"}
        </button>
      </form>

      {/* Upload Status Feedback */}
      <div className="mt-8 w-full max-w-md text-center">
        {uploadStatus === "success" && fileUrl && (
          <div className="p-4 bg-green-100 text-green-700 rounded-md shadow-sm border border-green-200">
            <p className="font-semibold mb-2">Upload Succesvol!</p>
            <p>Bestand URL:</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
              {fileUrl}
            </a>
            {/* Optioneel: Afbeelding preview */}
            {selectedFile && selectedFile.type.startsWith('image/') && (
              <div className="mt-4">
                <img src={fileUrl} alt="Geüploade afbeelding" className="max-w-full h-auto rounded-md border border-gray-300" />
              </div>
            )}
          </div>
        )}

        {uploadStatus === "error" && errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md shadow-sm border border-red-200">
            <p className="font-semibold mb-2">Upload Mislukt!</p>
            <p>{errorMessage}</p>
          </div>
        )}

        {uploadStatus === "uploading" && (
          <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md shadow-sm border border-yellow-200">
            <p>Bestand wordt geüpload...</p>
          </div>
        )}

        {uploadStatus === "idle" && selectedFile && (
          <div className="p-4 bg-blue-100 text-blue-700 rounded-md shadow-sm border border-blue-200">
            <p>Geselecteerd: <span className="font-semibold">{selectedFile.name}</span> ({Math.round(selectedFile.size / 1024)} KB)</p>
            <p className="text-sm text-blue-600 mt-1">Klik op 'Bestand Uploaden' om te starten.</p>
          </div>
        )}
      </div>
    </main>
  );
}