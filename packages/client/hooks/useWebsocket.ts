import { WebSocketContext } from '@/context/ws';
import { useContext } from 'react';

export const useWebsocket = () => {
	const context = useContext(WebSocketContext);

	if (!context) {
		throw new Error("Context 'WebSocketContext' was not provided!");
	}

    return context
};
