import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { setCurrentStep } from "~/store/FormSlice";

interface StepNavigatorProps {
  isPreviewMode?: boolean; // ✅ Add this prop
}

export default function StepNavigator({ isPreviewMode = false }: StepNavigatorProps) {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.form);
  const fields = useSelector((state: RootState) => state.form.fields);

  const maxStepInFields = fields.length ? Math.max(...fields.map(f => f.step ?? 0)) : 0;
  const stepCount = maxStepInFields + 2;
  const lastStep = Math.max(...fields.map(f => f.step ?? 0));

  const handleNext = () => {
    if (!isPreviewMode) {
      // 🧠 Skip validation if in edit mode
      dispatch(setCurrentStep(currentStep + 1));
      return;
    }

    // ✅ Validation logic only in preview mode
    const currentFields = fields.filter(field => field.step === currentStep);

    for (const field of currentFields) {
      if (!field.required) continue;

      if (field.type === "radio") {
        const radios = document.getElementsByName(field.id) as NodeListOf<HTMLInputElement>;
        const isChecked = Array.from(radios).some(r => r.checked);
        if (!isChecked) {
          alert(`Please select an option for: ${field.label}`);
          return;
        }
        continue;
      }

      if (field.type === "checkbox") {
        const checkboxes = field.options?.map(option =>
          document.getElementsByName(`${field.id}-${option}`)[0] as HTMLInputElement
        );
        const isChecked = checkboxes?.some(cb => cb?.checked);
        if (!isChecked) {
          alert(`Please select at least one option for: ${field.label}`);
          return;
        }
        continue;
      }

      const input = document.getElementsByName(field.id)[0] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input || !input.value.trim()) {
        alert(`Please fill out the required field: ${field.label}`);
        return;
      }
    }

    dispatch(setCurrentStep(currentStep + 1));
  };

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        disabled={currentStep === 0}
        onClick={handlePrevious}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm">Page {currentStep + 1} of {stepCount - 1}</span>
      <button
       disabled={isPreviewMode ? currentStep >= lastStep : currentStep >= stepCount - 1}
        onClick={handleNext}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
