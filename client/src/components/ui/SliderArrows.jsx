import { ChevronRight, ChevronLeft } from "lucide-react";

export function NextArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full p-2 shadow"
      onClick={onClick}
    >
      <ChevronRight className="w-6 h-6 text-gray-800" />
    </div>
  );
}

export function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full p-2 shadow"
      onClick={onClick}
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    </div>
  );
}
