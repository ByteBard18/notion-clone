import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-row bg-gray-300 h-screen flex-1 p-4">
      <div className=" flex animate-pulse space-x-4">
        <ArrowLeftCircle className="w-10 h-10 animate-pulse" />
        <div className="mt-1 animate-pulse font-bold text-2xl">
          Get started by creating a New Document
        </div>
      </div>
    </div>
  );
}
