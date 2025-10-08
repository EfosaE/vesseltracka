"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// 1️⃣ Define the shape of your global state
interface AppContextType {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  //   theme: "light" | "dark";
  //   toggleTheme: () => void;
}

// 2️⃣ Create the context with a default value (null first)
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3️⃣ Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);
  //   const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Track online/offline status manually
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  //   const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    console.log(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <AppContext.Provider
      value={{
        isOnline,
        setIsOnline,
        isSidebarOpen,
        toggleSidebar,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// 4️⃣ Custom hook to use the context anywhere
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
