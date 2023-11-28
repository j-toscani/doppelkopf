'use client'

import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';

type WebSocketContext = {
	ws: WebSocket | null;
};

export const WebSocketContext = createContext<null | WebSocketContext>(null);

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
	const [ws, setWs] = useState<null | WebSocket>(null);

	useEffect(() => {
		if (!ws) {
			const webSocket = new WebSocket('ws://localhost:4000/ws');
			webSocket.addEventListener('open', () => {
                console.log('Connection Open.')
            })

            webSocket.addEventListener('message', (e) => {
                console.log(e.data)
            })
			setWs(webSocket);
		}
		return () => ws?.close();
	}, [setWs, ws]);

	return <WebSocketContext.Provider value={{ ws }}>{children}</WebSocketContext.Provider>;
};
