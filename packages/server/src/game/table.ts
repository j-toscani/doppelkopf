import { TablePosition } from 'shared/types';

export const isTablePosition = (position: string): position is TablePosition =>
	['top', 'left', 'right', 'bottom'].includes(position);
