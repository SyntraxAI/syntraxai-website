import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        {/* Homepage Message */}
        <h1 className="text-4xl font-bold mb-4">
          Revenue-Focused Marketing, Accelerated by AI.
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          We deliver the outcomes of a 20-person agency with the precision and 
          cost-efficiency of an AI-first core. Our human experts pilot the tech; 
          your business gets the results.
        </p>

        {/* Critical Two-Button CTA */}
        <div className="flex justify-center gap-4">
          <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700">
            [Start a Project]
          </Link>
          <Link href="/programs" className="border border-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100">
            [Scale Your Growth]
          </Link>
        </div>
      </div>
    </main>
  );
}