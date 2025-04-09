export default function McCheckerPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6">
      <a href="/" className="text-sm text-blue-400 underline hover:text-blue-300 mb-4 block">
        ← Back to Home
      </a>
      <h1 className="text-3xl font-bold mb-6 text-blue-400">MC Username Checker</h1>
      <div className="w-full h-[650px] border border-gray-800 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="http://localhost:8000"
          title="MC Username Checker"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
