import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // استایل اصلی پروژه
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // برای مدیریت درخواست‌ها
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n"; // تنظیمات چندزبانه
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const queryClient = new QueryClient();

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);