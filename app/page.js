export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-xl font-bold">Send-Straal-Klaar.nl</div>
        <nav className="flex gap-4">
          <a
            href="/order"
            className="border-2 border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100 text-sm sm:text-base"
          >
            Bestelling plaatsen
          </a>
          <a
            href="/track"
            className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100 text-sm sm:text-base"
          >
            Bestelling volgen
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welkom bij Send-Straal-Klaar.nl</h1>
        <p className="text-lg mb-8">Wij blazen jouw werkstuk nieuw leven in.</p>

        {/* USP's */}
        <ul className="text-left mb-8 space-y-2 text-lg">
          <li>✅ Kleine bestellingen mogelijk</li>
          <li>✅ Direct een quote en verzendlabel</li>
          <li>✅ Binnen Nederland in 7 tot 14 dagen retour</li>
        </ul>

        {/* Uitlegblok */}
        <div className="max-w-xl text-left bg-gray-50 p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Hoe werkt het?</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Klik op "Bestelling plaatsen"</strong> en upload een foto van je werkstuk. Geef de kenmerken, afmetingen, gewicht en een korte omschrijving op. Je ontvangt direct een indicatie van de prijs voor het stralen én de verzendkosten.
            </li>
            <li>
              <strong>Plaats je bestelling</strong> - wij bekijken je aanvraag. Als je order wordt geaccepteerd, ontvang je een betaal link en een verzendlabel.
            </li>
            <li>
              <strong>Stuur je werkstuk op</strong> - zodra wij het ontvangen, gaan we aan de slag met stralen.
            </li>
            <li>
              <strong>Ontvang je werkstuk retour</strong> - binnen 7 tot 14 dagen heb je het weer in huis, gezandstraald en wel!
            </li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Je kunt het proces en de status van je bestelling volgen via de pagina <a href="/track" className="text-blue-500 hover:underline">Bestelling volgen</a>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-sm space-x-4">
        <a href="/faq" className="text-blue-500 hover:underline">Veelgestelde vragen</a>
        <a href="/terms" className="text-blue-500 hover:underline">Algemene voorwaarden</a>
        <a href="/contact" className="text-blue-500 hover:underline">Contact</a>
      </footer>
    </div>
  );
}
