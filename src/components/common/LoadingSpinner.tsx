import { Loader2 } from "lucide-react";

// 共用的載入指示器
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4 text-white">
    <Loader2 className="h-8 w-8 animate-spin bg-white" />
    <span className="ml-2">載入中...</span>
  </div>
);

export default LoadingSpinner;
