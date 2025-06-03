import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Algemene Voorwaarden</h1>

      <div className="max-w-2xl text-center">
        <p className="mb-4">
          Op deze pagina vind je de algemene voorwaarden van Snel-Zandstralen.nl.
          Deze zijn van toepassing op al onze diensten en leveringen.
        </p>

        <p className="mb-4">
          Klik op onderstaande knop om de algemene voorwaarden in PDF-formaat te bekijken of te downloaden.
        </p>

        <a
          href="https://lm0cofmgaioqoav7.public.blob.vercel-storage.com/Algemene%20voorwaarden%20Snel-Zandstralen.nl%20-%20v1-ojZS4NzGwQ7NWjgKYqOJTp88u4rN97.pdf" // Pas deze link aan zodra je de PDF hebt!
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Bekijk de Algemene Voorwaarden (PDF)
        </a>

        <p className="mt-8 text-sm text-gray-500">
          Vragen over onze voorwaarden? Neem gerust contact met ons op via de <Link href="/contact" className="text-blue-500 underline">contactpagina</Link>.
        </p>
      </div>

      <Link href="/" className="mt-8 inline-block text-blue-500 underline">Terug naar home</Link>
    </main>
  );
}
