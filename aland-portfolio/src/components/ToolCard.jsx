export default function ToolCard({ title, description, link }) {
  return (
    <a
      href={link}
      className="block bg-gray-900 p-5 rounded-xl border border-gray-800 shadow hover:shadow-xl hover:scale-[1.02] transition duration-200"
    >
      <h4 className="text-xl font-semibold mb-1 text-white">{title}</h4>
      <p className="text-gray-400 text-sm mb-2">{description}</p>
      <span className="text-blue-400 text-sm">Open Tool →</span>
    </a>
  );
}
