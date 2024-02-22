import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {setNodeProviderUrl} from "@starfish/artifacts";

const nodeUrl = import.meta.env.VITE_NODE_PROVIDER_URL;

if (nodeUrl) {
  console.log(nodeUrl)
  setNodeProviderUrl(nodeUrl);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
