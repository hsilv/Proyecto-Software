import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './Home.jsx'

test('Renderización de Home', () => {
    render(<Home/>)
})