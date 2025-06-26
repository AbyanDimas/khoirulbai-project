import { AlertTriangle, X, CheckCircle2, Info } from "lucide-react";
import { ReactNode } from "react";

type AlertVariant = "warning" | "error" | "success" | "info";

interface AlertBannerProps {
  variant?: AlertVariant;
  title?: string;
  message: ReactNode;
  onClose?: () => void;
  className?: string;
  dismissible?: boolean;
}

const AlertStyles = {
  warning: {
    light: "bg-amber-50 border-amber-100 text-amber-800",
    dark: "dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
  },
  error: {
    light: "bg-red-50 border-red-100 text-red-800",
    dark: "dark:bg-red-900/30 dark:border-red-800 dark:text-red-200",
    icon: <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
  },
  success: {
    light: "bg-green-50 border-green-100 text-green-800",
    dark: "dark:bg-green-900/30 dark:border-green-800 dark:text-green-200",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
  },
  info: {
    light: "bg-blue-50 border-blue-100 text-blue-800",
    dark: "dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200",
    icon: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />
  }
};

export default function StatusAlert({
  variant = "error",
  title,
  message,
  onClose,
  className = "",
  dismissible = true,
}: AlertBannerProps) {
  const variantStyles = AlertStyles[variant];

  return (
    <div
      className={`rounded-md border p-4 ${variantStyles.light} ${variantStyles.dark} ${className} relative`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
          {variantStyles.icon}
        </div>
        
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{message}</div>
        </div>
        
        {dismissible && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex rounded-md p-1.5 hover:bg-black/10 dark:hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-current" />
          </button>
        )}
      </div>
    </div>
  );
}