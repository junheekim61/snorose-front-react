import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import BoardPage from './pages/BoardPage/BoardPage';
import BoardListPage from './pages/PostListPage/PostListPage'; // 테스트용
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ExamReviewPage from './pages/ExamReviewPage/ExamReviewPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import NotificationPage from './pages/NotificationPage/NotificationPage';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/home', element: <MainPage /> },
      { path: '/board', element: <BoardPage /> },
      { path: '/board/:id', element: <BoardListPage /> },
      { path: '/exam-review', element: <ExamReviewPage /> },
      { path: '/notification', element: <NotificationPage /> },
      { path: '/my-page', element: <MyPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode fri>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
