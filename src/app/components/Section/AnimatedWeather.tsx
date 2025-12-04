export const AnimatedWeather = ({ condition }: { condition: string }) => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* CLEAR (SUN) */}
      {condition === "Clear" && (
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-60 animate-pulse"></div>
          <div className="relative w-8 h-8 bg-yellow-300 rounded-full shadow-lg animate-glow"></div>
        </div>
      )}

      {/* CLOUDY */}
      {condition === "Cloudy" && (
        <div className="relative">
          <div className="absolute w-8 h-4 bg-gray-300 dark:bg-gray-500 rounded-full animate-cloudMove opacity-80"></div>
          <div className="absolute w-6 h-3 bg-gray-200 dark:bg-gray-400 rounded-full left-2 top-2 opacity-90 animate-cloudMove"></div>
        </div>
      )}

      {/* PARTLY CLOUDY */}
      {condition === "PartlyCloudy" && (
        <div className="relative">
          {/* Sun */}
          <div className="absolute left-0 top-0 w-6 h-6 bg-yellow-300 rounded-full shadow animate-glow"></div>

          {/* Clouds */}
          <div className="absolute w-8 h-4 bg-gray-300 dark:bg-gray-500 rounded-full right-0 animate-cloudMove"></div>
          <div className="absolute w-5 h-3 bg-gray-200 dark:bg-gray-400 rounded-full right-1 top-3 animate-cloudMove"></div>
        </div>
      )}

      {/* RAIN */}
      {condition === "Rain" && (
        <div className="relative flex flex-col items-center">
          {/* Cloud */}
          <div className="w-9 h-4 bg-gray-300 dark:bg-gray-500 rounded-full animate-cloudMove"></div>

          {/* Rain Drops */}
          <div className="flex space-x-1 mt-1">
            <div className="w-1 h-3 bg-blue-400 rounded-full animate-rain"></div>
            <div className="w-1 h-3 bg-blue-400 rounded-full animate-rain2"></div>
            <div className="w-1 h-3 bg-blue-400 rounded-full animate-rain"></div>
          </div>
        </div>
      )}
    </div>
  );
};
