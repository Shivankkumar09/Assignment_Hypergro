
import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

export default function SharePage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [valid, setValid] = useState(false);
  const [shareURL, setShareURL] = useState("");

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`form-${id}`);
      if (stored) {
        setValid(true);
        const url = `${window.location.origin}/preview/${id}`;
        setShareURL(url);
      }
    }
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!valid) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ❌ Form not found or invalid link.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md p-8 rounded-lg max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Share this Form
        </h1>

        <input
          type="text"
          readOnly
          value={shareURL}
          className="w-full px-4 py-2 border rounded mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        />

        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
        >
          {copied ? "✅ Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
