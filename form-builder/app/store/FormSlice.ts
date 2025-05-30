// app/store/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'date'| 'number' | 'email' |'radio';
type Theme = 'light' | 'dark';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For dropdown or checkbox
  minLength?: number;
  maxLength?: number;
  pattern?: string;
   step?: number;
     helpText?: string;
}

interface FormState {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  theme: Theme;
    currentStep: number; // 🆕
  stepCount: number; // 🆕
}


const initialState: FormState = {
  id:uuidv4(),
  name: '',
  description: '',
  fields: [],
  theme: 'dark',
  currentStep: 0, // 🆕
  stepCount: 1, // 🆕
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setFormDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addField: (state, action: PayloadAction<FormField>) => {
       const fieldWithStep = { ...action.payload, step: state.currentStep };
      state.fields.push(fieldWithStep);
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const idx = state.fields.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state.fields[idx] = action.payload;
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    reorderFields: (state, action: PayloadAction<FormField[]>) => {
      state.fields = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
  state.currentStep = action.payload;
},
setStepCount: (state, action: PayloadAction<number>) => {
  state.stepCount = action.payload;
},
    resetForm: (state) => {
      state.id = uuidv4();
      state.name = '';
      state.description = '';
      state.fields = [];
    },
 loadTemplate: (state, action: PayloadAction<{ name: string; description: string; fields: FormField[] }>) => {
  state.name = action.payload.name;
  state.description = action.payload.description;
  state.fields = action.payload.fields.map((f) => ({
    ...f,
    id: uuidv4(), // new unique id
    step: f.step ?? 0,
  }));
  state.currentStep = 0;
  state.stepCount = 1;
}

  },
});


export const {
  setFormName,
  setFormDescription,
  addField,
  updateField,
  removeField,
  reorderFields,
  toggleTheme,
  setCurrentStep,
  setStepCount,
  resetForm,
   loadTemplate,
} = formSlice.actions;

export default formSlice.reducer;
function nanoid(): string {
  throw new Error('Function not implemented.');
}

