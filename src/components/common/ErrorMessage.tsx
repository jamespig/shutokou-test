import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorMsg {
  message: string;
}

// 共用的錯誤顯示組件
const ErrorMessage: React.FC<ErrorMsg> = ({ message }) => (
  <Alert variant="destructive" className="mb-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default ErrorMessage;
