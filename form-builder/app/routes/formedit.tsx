
import { v4 as uuidv4 } from "uuid";
import type { FieldType, FormField } from "./types/form";
import Navbar from "../components/Navbar";
import { RootState } from "~/store";
import { useDispatch, useSelector } from "react-redux";
import {addField,updateField, removeField, setFormName,setFormDescription, setCurrentStep, reorderFields} from "../store/FormSlice";
import { DndContext,closestCenter,PointerSensor,useSensor,useSensors,DragEndEvent} from "@dnd-kit/core";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import {arrayMove,SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DraggableFormCard from "../components/DraggableFormCard";
import StepNavigator from "../components/StepNavigator";

export default function Index() {

  const dispatch = useDispatch();
const fields = useSelector((state: RootState) => state.form.fields);
const name = useSelector((state: RootState) => state.form.name);
const description = useSelector((state: RootState) => state.form.description);
  const theme = useSelector((state: RootState) => state.form.theme);
   const currentStep = useSelector((state: RootState) => state.form.currentStep ?? 0);
  

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  })
);

 const handleAddField = (type: FieldType) => {
  const newField: FormField = {
    id: uuidv4(),
    type,
    label: "",
    required: false,
    placeholder: "",
    options: type === "dropdown" || type === "checkbox" ? [] : undefined,
  };
  dispatch(addField(newField));
};

const handleUpdateField = (id: string, data: Partial<FormField>) => {
  const existing = fields.find(f => f.id === id);
  if (!existing) return;
  dispatch(updateField({ ...existing, ...data }));
};

const handleDeleteField = (id: string) => {
 
  const updatedFields = fields.filter(f => f.id !== id);
  dispatch(removeField(id));

  
  const remainingFieldsOnCurrentStep = updatedFields.filter(f => f.step === currentStep);

  if (remainingFieldsOnCurrentStep.length === 0) {
    const availableSteps = [...new Set(updatedFields.map(f => f.step))].sort((a, b) => a - b);
    const previousValidStep = availableSteps.filter(step => step < currentStep).pop();

    if (previousValidStep !== undefined) {
      dispatch(setCurrentStep(previousValidStep));
    } else if (availableSteps.length > 0) {
      dispatch(setCurrentStep(availableSteps[0])); 
    } else {
      dispatch(setCurrentStep(0)); 
    }
  }
};

const handleDragEnd = (event: any) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const oldIndex = fields.findIndex(f => f.id === active.id);
  const newIndex = fields.findIndex(f => f.id === over.id);

  if (oldIndex !== -1 && newIndex !== -1) {
    const reordered = arrayMove(fields, oldIndex, newIndex);
    dispatch(reorderFields(reordered));
  }
};

  
 

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors">
        <Navbar />
        <div className="p-6 max-w-4xl mx-auto">
          
          <div className="mb-6 space-y-4" >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Form Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => dispatch(setFormName(e.target.value))}
                placeholder="Enter form title"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Form Description
              </label>
              <textarea
                value={description}
                onChange={(e) => dispatch(setFormDescription(e.target.value))}
                placeholder="Add a short description for this form"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          </div>

       
          <div className="mb-6">
  <button
    onClick={() => handleAddField("Text")} 
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
  >
    + Add Field
  </button>
</div>

         
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
  <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
    <StepNavigator  isPreviewMode={false} />
    {fields.filter(field => field.step === currentStep).map((field) => (
      <DraggableFormCard
        key={field.id}
        field={field}
        onUpdate={(data) => handleUpdateField(field.id, data)}
        onDelete={() => handleDeleteField(field.id)}
      />
    ))}
  </SortableContext>
</DndContext>
        </div>
      </div>
    </div>
  );
}