import { DragEventHandler, useState } from 'react';
import { OrderedCard } from 'shared';

export const useDraggableCard = (card: OrderedCard, onCardMoved: (_card: OrderedCard) => void) => {
	const [isDragging, setIsDragging] = useState(false);

	const onDragStart: DragEventHandler = (e) => {
		e.dataTransfer.setData('application/doppelkopf', JSON.stringify(card));
		setIsDragging(true);
	};
	const onDragEnd: DragEventHandler = (e) => {
		if (e.dataTransfer.dropEffect === 'move') {
			onCardMoved(card);
		}
		setIsDragging(false);
	};

	return {
		onDragEnd,
		onDragStart,
		isDragging,
	};
};
