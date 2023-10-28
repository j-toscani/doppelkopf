/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Page from './page'

it('Renders my Homepage', () => {
    const homePage = render(<Page />);
    expect(screen.getByRole('heading').textContent).toBe(' Willkommen! ')
})