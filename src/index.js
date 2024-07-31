import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { ToastProvider } from './contexts/ToastContext.jsx';

import { BoardListPage, BoardPage } from './pages/BoardPage';
import {
  ChangePasswordPage,
  DeleteAccountPage,
  EditInfoPage,
  MyPage,
} from './pages/MyPage';
import { PostPage, PostSearchPage, PostWritePage } from './pages/PostPage';
import App from './App';
import AboutPage from './pages/AboutPage/AboutPage';
import AlertPage from './pages/AlertPage/AlertPage';
import AuthPage from './pages/AuthPage/AuthPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import FindIdPage from './pages/LoginPage/FindIdPage/FindIdPage';
import FoundIdPage from './pages/LoginPage/FoundIdPage/FoundIdPage';
import HelpPage from './pages/HelpPage/HelpPage';
import LoginPage from './pages/LoginPage/Login';
import MainPage from './pages/MainPage/MainPage';
import NotFoundIdPage from './pages/LoginPage/NotFoundIdPage/NotFoundIdPage';
import NoticePage from './pages/NoticePage/NoticePage';
import ProtectedRoute from './ProtectedRoute';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import ViewPointListPage from './pages/MyPage/ViewPointListPage';

import { ROLE } from './constants';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'home', element: <MainPage /> },
      { path: '/board', element: <BoardPage /> },
      {
        path: '/board/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/first-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/first-snow/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/large-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/large-snow/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/permanent-snow',
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/permanent-snow/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/besookt',
        element: (
          <ProtectedRoute
            roles={[ROLE.user, ROLE.user2, ROLE.admin, ROLE.official]}
          >
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/board/besookt/search',
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      { path: '/post', element: <PostPage /> },
      { path: '/post-search', element: <PostSearchPage /> },
      { path: '/post-write', element: <PostWritePage /> },
      { path: 'exam-review', element: <ExamReviewPage /> },
      { path: 'alert', element: <AlertPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'my-page/password', element: <ChangePasswordPage /> },
      { path: 'my-page/edit-info', element: <EditInfoPage /> },
      { path: 'my-page/view-point-list', element: <ViewPointListPage /> },
      { path: 'my-page/delete-account', element: <DeleteAccountPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'notice', element: <NoticePage /> },
      { path: 'authentication', element: <AuthPage /> },
      { path: 'help', element: <HelpPage /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'find-id',
        element: <FindIdPage />,
      },
      {
        path: 'found-id',
        element: <FoundIdPage />,
      },
      {
        path: 'not-found-id',
        element: <NotFoundIdPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>
);

reportWebVitals();
