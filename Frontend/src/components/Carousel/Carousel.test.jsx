import { fireEvent, render, screen } from '@testing-library/react'
import Carousel from './Carousel';

const data = [
    {
        id: 10,
        nombre: 'abc',
        tiempo: 20,
        avg_calificacion: 4,
        descripcion: 'a',
        miniatura: [],
        usuario: {username: 'savor_the_flavor'}
    },
    {
        id: 11,
        nombre: 'defg',
        tiempo: 20,
        avg_calificacion: 4,
        descripcion: 'b',
        miniatura: [],
        usuario: {username: 'user2'}
    }
]

test('renders Carousel', () => {
    render(<Carousel recipes={data}/>);
    expect.anything();
})

test('Clicking right arrow changes item', async () => {
    render(<Carousel recipes={data}/>);
    let prevName = screen.getByLabelText('titleText').textContent;
    fireEvent.click(screen.getByLabelText('right-arrow'));
    expect(screen.getByLabelText('titleText').textContent).not.toBe(prevName);
})

test('Clicking right arrow changes item and left arrow returns to previous item', async () => {
    render(<Carousel recipes={data}/>);
    let prevName = screen.getByLabelText('titleText').textContent;
    fireEvent.click(screen.getByLabelText('right-arrow'));
    expect(screen.getByLabelText('titleText').textContent).not.toBe(prevName);
    fireEvent.click(screen.getByLabelText('left-arrow'));
    expect(screen.getByLabelText('titleText').textContent).toBe(prevName);
})