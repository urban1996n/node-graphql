import React from 'react'
import {createRoot} from 'react-dom/client'
import {ClientInterface, Client} from "@node-graphql/shared"

interface AppProps {
    httpClient: ClientInterface;
}

const App = ({httpClient}: AppProps) => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Vite + React + Express</h1>
            <button
                className="mt-4 rounded bg-black text-white px-4 py-2"
                onClick={async () => {
                    const res = await httpClient.get<boolean>('/api/health');
                    console.error({res});

                    alert(`API is ${res ? 'healthy' : 'unhealthy'}`);
                }}
            >
                Ping API
            </button>
        </div>
    )
}

createRoot(document.getElementById('root')!)
    ?.render(<App httpClient={new Client()}/>)
