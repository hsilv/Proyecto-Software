import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button';

test('Button is disabled when loading', () => {
    render(<Button onClick={() => {return "click"}} loading={true}/>);
    expect(screen.getByRole('button')).toBeDisabled();
})