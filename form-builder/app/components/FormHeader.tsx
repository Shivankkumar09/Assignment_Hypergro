interface FormHeaderProps {
  name: string;
  description: string;
  onNameChange: (val: string) => void;
  onDescChange: (val: string) => void;
}

export default function FormHeader({ name, description, onNameChange, onDescChange }: FormHeaderProps) {
  return (
    <div className="flex flex-col gap-3 mb-6 px-4">
      <input
        type="text"
        placeholder="Form name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <textarea
        placeholder="Form description with any borders..."
        value={description}
        onChange={(e) => onDescChange(e.target.value)}
        className="p-2 border rounded w-full"
      />
    </div>
  );
}
