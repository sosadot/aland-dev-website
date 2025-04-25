// pages/ResponsiveViewerPage.jsx
import ResponsiveViewer from "../tools/ResponsiveViewer";

export default function ResponsiveViewerPage() {
  return (
    <main className="bg-[#0e0e10] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <ResponsiveViewer />
      </div>
    </main>
  );
}
