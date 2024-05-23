import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import "./App.scss";

import { Analytics } from "@vercel/analytics/react";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { buildProvidersTree } from "./shared/utils";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({});

const ProvidersTree = buildProvidersTree([
  [MantineProvider, { theme }],
  [QueryClientProvider, { client: queryClient }],
]);

root.render(
  <ProvidersTree>
    <App />
    <Notifications
      id="noti-id"
      position="top-right"
      zIndex={10011}
      autoClose={5000}
    />
    <Analytics />
  </ProvidersTree>
);
