import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StoreProvider store={store}>
            <App />
        </StoreProvider>
    </StrictMode>,
);
