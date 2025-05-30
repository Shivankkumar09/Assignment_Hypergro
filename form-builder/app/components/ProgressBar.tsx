export default function ProgressBar({ current, total }: { current: number, total: number }) {
  const percent = total > 0 ? (current + 1) / total * 100 : 0;

  return (
   <div className="w-full mt-4 px-4">
  <div className="w-full max-w-xl h-2 mx-auto bg-gray-300 rounded">
    <div
      className="h-full bg-blue-600 rounded transition-all duration-300"
      style={{ width: `${percent}%` }}
    />
  </div>
  <div className="text-right text-sm mt-1 text-gray-600 max-w-xl mx-auto">
    {Math.round(percent)}% completed
  </div>
</div>
  );
}
