import TypingTest from "../components/TypingTest";

export default function TypingTestPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6">
      <a href="/" className="text-sm text-blue-400 underline hover:text-blue-300 mb-4 block">
        ← Back to Home
      </a>
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Typing Speed Tester</h1>
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <TypingTest />
      </div>
    </div>
  );
}
