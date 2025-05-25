export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-xl font-bold">Send-Straal-Klaar.nl</div>
        <nav className="space-x-4">
          <a href="/order" className="text-blue-500 hover:underline">Bestelling plaatsen</a>
          <a href="/track" className="text-blue-500 hover:underline">Bestelling volgen</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welkom bij Send-Straal-Klaar.nl</h1>
        <p className="text-lg mb-8">Wij blazen jouw werkstuk nieuw leven in.</p>

        {/* USP's */}
        <ul className="space-y-2 text-lg mb-8">
          <li>✅ Kleine bestellingen mogelijk</li>
          <li>✅ Direct een quote en verzendlabel</li>
          <li>✅ Binnen Nederland in 7 tot 14 dagen retour</li>
        </ul>

        {/* Uitlegblok */}
        <div className="max-w-xl text-left bg-gray-50 p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">Hoe werkt het?</h2>
          <p className="mb-2">
            Upload een foto van je werkstuk, geef de kenmerken, afmetingen, gewicht en een korte omschrijving. 
            Wij geven direct een prijsindicatie. Daarna ontvang je een verzendlabel om je werkstuk naar ons te sturen.
          </p>
          <p>
            Binnen 7 tot 14 dagen ontvang je jouw werkstuk terug, gezandstraald en klaar om verder te gebruiken!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-sm space-x-4">
        <a href="#">Over</a>
        <a href="#">Contact</a>
        <a href="#">Shipping</a>
        <a href="#">Blog</a>
        <a href="#">Terms of Use</a>
      </footer>
    </div>
  );
}
