import { QueryProvider } from "./QueryProvider";
import { BrowserRouter } from "react-router-dom";

export const AppProviders = ({ children }) => {
  return (
    <QueryProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryProvider>
  );
};
