import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-400">
          Welcome to Hypergro Forms
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Create beautiful, customizable forms with drag-and-drop fields, live previews, validation, and sharing. Perfect for surveys, feedback, and data collection.
        </p>
        <ul className="text-left list-disc list-inside text-sm sm:text-base text-gray-400 space-y-1">
          <li>📌 Drag & drop fields like Text, Email, Radio, Date, etc.</li>
          <li>🎯 Live preview and multi-step navigation</li>
          <li>🧠 Auto-save, undo/redo, and theme toggle</li>
          <li>🔗 Shareable Form ID & response collection</li>
        </ul>
        <Link
          to="/formedit"
          className="inline-block mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg rounded-xl transition"
        >
          Start Building →
        </Link>
      </div>
    </main>
  );
}
