import { FaMoon, FaSun } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, toggleTheme } from "../store/FormSlice";
import { RootState } from "../store";
import { Link, useNavigate, useLocation } from "@remix-run/react";
import { useState } from "react";

export default function Navbar() {
  const theme = useSelector((state: RootState) => state.form.theme);
  const form = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formId = useSelector((state: RootState) => state.form.id);
  const isPreviewPage = location.pathname.startsWith("/preview/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    navigate(`/share/${formId}`);
    setIsMenuOpen(false);
  };

  const handlePreview = () => {
    if (!form.name.trim()) {
      alert("Please add a form name before previewing.");
      return;
    }

    if (form.fields.length === 0) {
      alert("Please add at least one field to preview the form.");
      return;
    }

    navigate(`/preview/${formId}`);
    setIsMenuOpen(false);
  };

  const handleCreateNewForm = () => {
    dispatch(resetForm());
    navigate('/formedit');
    setIsMenuOpen(false);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <header className="flex items-center justify-between px-4 py-3 shadow bg-white text-black dark:bg-gray-900 dark:text-white">
        <h1 className="text-lg font-bold">FormCrafter</h1>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isPreviewPage && (
            <>
              <button onClick={handlePreview} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Preview</button>
              <button onClick={handleShare} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Share</button>
              <button onClick={handleCreateNewForm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create New Form</button>
            </>
          )}

          {isPreviewPage && (
            <Link to="/formedit">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Edit</button>
            </Link>
          )}

          <button onClick={() => dispatch(toggleTheme())}
            className="flex items-center justify-center w-10 h-10 text-lg text-white bg-gray-600 rounded-full hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white shadow dark:bg-gray-800 dark:text-white space-y-2">
          {!isPreviewPage && (
            <>
              <button onClick={handlePreview} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Preview</button>
              <button onClick={handleShare} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Share</button>
              <button onClick={handleCreateNewForm} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create New Form</button>
            </>
          )}

          {isPreviewPage && (
            <Link to="/formedit">
              <button onClick={() => setIsMenuOpen(false)} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Edit</button>
            </Link>
          )}

          <button onClick={() => {
            dispatch(toggleTheme());
            setIsMenuOpen(false);
          }}
            className="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </div>
  );
}
