import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>

      <div className="max-w-2xl text-left space-y-4">
        <p>
          Wij zijn gevestigd aan de <strong>Tt. Vasumweg 111, Amsterdam</strong>.
          Let op: <span className="font-semibold text-red-600">bezoek alleen mogelijk op afspraak</span>.
          Er is geen balie of showroom waar je zonder afspraak kunt langskomen.
        </p>

        <p>
          Voor vragen of het maken van een afspraak kun je ons bereiken via:
        </p>

        <ul className="list-disc list-inside space-y-2">
            <li>📧 E-mail: <a href="mailto:info@snel-zandstralen.nl" className="text-blue-500 underline">info@snel-zandstralen.nl</a></li>
        </ul>

        <p>
          Wij proberen zo snel mogelijk te reageren op je bericht. Bedankt voor je begrip!
        </p>
      </div>

      <Link href="/" className="mt-8 inline-block text-blue-500 underline">Terug naar home</Link>
    </main>
  );
}
