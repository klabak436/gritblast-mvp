import Link from 'next/link';

export default function FAQPage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Veelgestelde Vragen</h1>

      <div className="max-w-2xl w-full space-y-6">
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Wat is zandstralen?</h2>
          <p>
            Zandstralen is een techniek waarbij een werkstuk wordt schoongemaakt of opgeruwd met behulp van een straalmiddel, zoals zand of korund, onder hoge druk.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Wat kan ik laten stralen?</h2>
          <p>
            Wij stralen een breed scala aan objecten: metalen onderdelen, kunstwerken, meubels, kleine machines en nog veel meer. Vraag gerust naar de mogelijkheden!
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Hoe lang duurt het voordat ik mijn artikel terugkrijg?</h2>
          <p>
            De meeste werken zijn binnen 7 tot 14 dagen retour, afhankelijk van het formaat en de complexiteit.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Wat kost zandstralen?</h2>
          <p>
            De prijs is afhankelijk van het oppervlak, gewicht en complexiteit. Vul het formulier in op onze website voor een directe prijsindicatie.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Hoe werkt het verzenden?</h2>
          <p>
            Na het invullen van je gegevens ontvang je een verzendlabel en instructies om je werkstuk op te sturen met DHL of PostNL. De verzendkosten zijn inclusief retour en te volgen via track en trace.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Wat als ik niet tevreden ben?</h2>
          <p>
            We streven naar 100% tevredenheid. Mocht je niet tevreden zijn, neem dan direct contact met ons op zodat we samen een oplossing kunnen vinden. Als we het niet kunnen stralen dan sturen we het terug zonder straalkosten in rekening te brengen, u betaald dan alleen de verzendkosten.
          </p>
        </div>
      </div>

      <Link href="/" className="mt-8 inline-block text-blue-500 underline">Terug naar home</Link>
    </main>
  );
}
