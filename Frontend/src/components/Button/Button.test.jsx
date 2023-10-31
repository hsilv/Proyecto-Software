/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button';

test('Button is disabled when loading', () => {
    render(<Button onClick={() => {return "click"}} loading={true}/>);
    expect(screen.getByRole('button')).toBeDisabled();
})