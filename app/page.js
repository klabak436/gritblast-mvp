export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-xl font-bold">Snel-Zandstralen.nl</div>
        <nav className="flex gap-4">
          <a
            href="/order"
            className="border-2 border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-100 text-sm sm:text-base"
          >
            Bestelling plaatsen
          </a>
          <a
            href="/quote"
            className="border-2 border-yellow-500 text-yellow-600 px-4 py-2 rounded hover:bg-yellow-100 text-sm sm:text-base"
          >
            Bereken prijs
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
        <h1 className="text-4xl font-bold mb-4">Welkom bij Snel-Zandstralen.nl</h1>
        <p className="text-lg mb-8">Wij blazen jouw metaal nieuw leven in.</p>

        {/* USP's */}
        <ul className="text-left mb-8 space-y-2 text-lg">
          <li>✅ Zandstralen en coaten voor een scherpe prijs</li>
          <li>✅ Kleine bestellingen mogelijk</li>
          <li>✅ Direct een prijsindicatie inclusief verzendkosten</li>
          <li>✅ Binnen Nederland in 7 dagen retour</li>
        </ul>

        {/* Uitlegblok */}
        <div className="max-w-xl text-left bg-gray-50 p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Hoe werkt het?</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Klik op &quot;Bestelling plaatsen&quot;</strong> - upload een foto van wat je wilt laten zandstralen. Geef de kenmerken, afmetingen, gewicht en een korte omschrijving. Je ontvangt direct een indicatie van de prijs voor het stralen en evenuteel coaten.
            </li>
            <li>
              <strong>Plaats je bestelling</strong> - wij bekijken je aanvraag. Als je order wordt geaccepteerd, ontvang je een betaal link en een verzendlabel via e-mail.
            </li>
            <li>
              <strong>Stuur het op</strong> - zodra wij het ontvangen, gaan we aan de slag met stralen en indien gewenst coaten.
            </li>
            <li>
              <strong>Ontvang het retour</strong> - binnen 7 dagen gezandstraald afgeleverd!
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
