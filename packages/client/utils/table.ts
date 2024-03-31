import { TablePosition } from 'shared';

export const isTablePosition = (position: string): position is TablePosition =>
	['top', 'left', 'right', 'bottom'].includes(position);
