import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, toggleTheme } from "../store/FormSlice"; // Adjust the import path as necessary
import { RootState } from "../store";
import { Link, useNavigate } from "@remix-run/react";
import { useLocation } from "@remix-run/react";

export default function Navbar() {
  const theme = useSelector((state: RootState) => state.form.theme);
  const form = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const formId = useSelector((state: RootState) => state.form.id);
const location = useLocation();
const isPreviewPage = location.pathname.startsWith("/preview/");

 const handleShare = () => {
  if (!form.name.trim()) {
    alert("Please add a form name before sharing.");
    return;
  }

  if (form.fields.length === 0) {
    alert("Please add at least one field to share the form.");
    return;
  }

  
  const shareData = {
    name: form.name,
    description: form.description,
    fields: form.fields,
  };

  localStorage.setItem(`form-${formId}`, JSON.stringify(shareData));

  navigate(`/share/${formId}`); // ✅ Navigate after successful validation and saving
};

const handlePreview = () => {
if (!form.name.trim()) {
    alert("Please add a form name before sharing.");
    return;
  }

  if (form.fields.length === 0) {
    alert("Please add at least one field to share the form.");
    return;
  }

   navigate(`/preview/${formId}`); 
};

const handleCreateNewForm = () => {
  dispatch(resetForm());
  navigate('/formedit'); // redirect to form edit page to reflect new form
};

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <header className="flex items-center justify-between px-6 py-4 shadow  bg-white text-black  dark:bg-gray-900 dark:text-white">
        <h1 className="text-xl font-bold">Hypergro-Forms</h1>
       <div className="flex items-center gap-4">
  {/* Preview Button */}
  {!isPreviewPage && (
    <>
  <button
  onClick={handlePreview}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    Preview
  </button>
 
  <button 
  onClick={handleShare}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    Share
  </button>

<button 
  onClick={handleCreateNewForm}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    Create New Form
  </button>
</>)}

<Link to="/formedit" className="flex items-center gap-2">
 {isPreviewPage && <button 
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    back to edit
  </button>
}
</Link>
  {/* Reset Form Button */}

  {/* Theme Toggle Button */}
  <button
    onClick={() => dispatch(toggleTheme())}
    className="flex items-center justify-center w-10 h-10 text-lg text-white bg-gray-600 rounded-full hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
    title="Toggle Theme"
  >
    {theme === "dark" ? <FaSun /> : <FaMoon />}
  </button>
</div>

      </header>
    </div>
  );
}
