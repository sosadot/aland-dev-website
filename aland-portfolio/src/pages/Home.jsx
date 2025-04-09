import ToolCard from "../components/ToolCard";

export default function Home() {
  return (
    <div className="bg-[#0e0e10] text-white min-h-screen font-sans">
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl font-extrabold mb-4">I Build Developer Tools</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          I'm Aland Aki — a full-stack developer who creates fast, clean tools that automate, analyze, and empower.
        </p>
      </section>

      <section id="tools" className="px-6 py-20">
        <h3 className="text-3xl font-bold mb-12 text-center text-blue-400">My Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ToolCard
            title="MC Username Checker"
            description="Check Minecraft username availability in real-time."
            link="/tools/mc-checker"
          />
          <ToolCard
            title="Typing Speed Tester"
            description="Test how fast you type and see live WPM."
            link="/tools/typing-test"
          />
        </div>
      </section>
    </div>
  );
}
