import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import SearchPage from '../SearchPage';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({
    searchText: '', // Initialize it with a default value
  }),
}));

describe('SearchPage', () => {
  it('Should render same text passed into search bar', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/SearchPage']}>
          <SearchPage />
        </MemoryRouter>
      );

      const searchText = 'Postres';
      const searchInput = screen.getByPlaceholderText(/Search something/);
      const searchButton = screen.getByRole('button');
      fireEvent.change(searchInput, { target: { value: searchText } });
      fireEvent.click(searchButton);
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/SearchPage/${encodeURIComponent('Postres')}`);
  });

  it('Should pass search parameter to the navigation', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/SearchPage']}>
          <SearchPage />
        </MemoryRouter>
      );

      const searchText = 'Cakes';
      const searchInput = screen.getByPlaceholderText(/Search something/);
      const searchButton = screen.getByRole('button');
      fireEvent.change(searchInput, { target: { value: searchText } });
      fireEvent.click(searchButton);
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/SearchPage/${encodeURIComponent('Cakes')}`);
  });
});