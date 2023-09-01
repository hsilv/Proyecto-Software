import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../Home'
import { act } from 'react-dom/test-utils'
import TestRenderer from 'react-test-renderer';
import useSession from '../../../hooks/useSession'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("non-shallow render", () => {
  const { login, logOut, logged, loading, loginError, error, checkSession, userInfo } = useSession();
  const element = new TestRenderer.create(
    <SessionContext.Provider value={{
      login,
      logOut,
      logged,
      loading,
      loginError,
      error,
      checkSession,
      userInfo,
    }}>
      <Home/>
    </SessionContext.Provider>
  );
  expect(mockedUsedNavigate).toHaveBeenCalledWith(`/`)
});




