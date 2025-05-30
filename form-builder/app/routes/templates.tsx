// app/routes/templates.tsx
import { useDispatch } from "react-redux";
import { loadTemplate } from "../store/FormSlice";
import { useNavigate } from "@remix-run/react";


export default function TemplatesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const templates = [
  {
    name: "Contact Us Form",
    description: "Collect name, email, and message.",
    fields: [
      { id: "1", type: "text", label: "Name", placeholder: "Enter your name", required: true, step: 0 },
      { id: "2", type: "email", label: "Email", placeholder: "Enter your email", required: true, step: 0 },
      { id: "3", type: "textarea", label: "Message", placeholder: "Your message", required: true, step: 0 },
    ],
  },
  {
    name: "Job Application",
    description: "Standard job application form.",
    fields: [
      { id: "1", type: "text", label: "Full Name", placeholder: "Enter your full name", required: true, step: 0 },
      { id: "2", type: "email", label: "Email", placeholder: "Enter your email", required: true, step: 0 },
      { id: "3", type: "text", label: "Phone", placeholder: "Enter phone number", required: true, step: 0 },
      { id: "4", type: "textarea", label: "Why should we hire you?", placeholder: "Your answer", required: true, step: 0 },
    ],
  },
  {
    name: "Feedback Form",
    description: "Simple feedback form.",
    fields: [
      { id: "1", type: "text", label: "Name", placeholder: "Optional", required: false, step: 0 },
      { id: "2", type: "radio", label: "Rate Us", required: true, options: ["Excellent", "Good", "Average", "Poor"], step: 0 },
      { id: "3", type: "textarea", label: "Comments", placeholder: "Write your comments here", required: false, step: 0 },
    ],
  },
];


  const handleUseTemplate = (template: typeof templates[0]) => {
    dispatch(loadTemplate(template)); // load into Redux
    navigate("/formedit"); // redirect to editor
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Choose a Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {templates.map((template, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
            <button
              onClick={() => handleUseTemplate(template)}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
            >
              Use This Template
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
