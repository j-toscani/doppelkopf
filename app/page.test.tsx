/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Page from './page'

it('Renders my Homepage', () => {
    render(<Page />);
    expect(screen).toBeDefined()
})