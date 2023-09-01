import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import SearchPage from '../SearchPage'
import { act } from 'react-dom/test-utils'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("SearchPage", () => {

  it('Should not navigate when the search input is empty', async () => {
    const searchText = ''; // Empty search text
  
    render(
      <BrowserRouter>
        <SearchPage searchParam={searchText} />
      </BrowserRouter>
    );
  
    const searchInput = screen.getByPlaceholderText(/Search something/);
  
    await act(async () => {
      const searchButton = screen.getByRole('button');
      fireEvent.change(searchInput, { target: { value: searchText } });
    });
  
    // Expect that navigation is not called because the input is empty
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
  });

  it('Should render same text passed into search bar', async () => {

    const searchText = 'Postres'

    render(
      <BrowserRouter>
          <SearchPage searchParam={searchText}/>
      </BrowserRouter>
      )

    const searchInput = screen.getByPlaceholderText(/Search something/)

    await act(async () => {
      
      const searchButton = screen.getByRole('button')
      fireEvent.change(searchInput, {target: {value: searchText}})
      console.log(searchInput.value)
      fireEvent.click(searchButton)

    })

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`/SearchPage/${encodeURIComponent(searchText)}`)

  })

    
    
})