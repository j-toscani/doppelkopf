/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Page from './page';

it('Renders my Homepage', () => {
	render(<Page params={{ gameId: '1' }} />);
	expect(screen).toBeDefined();
});
