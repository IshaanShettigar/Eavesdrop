import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Tasks } from './TaskDashboard Components/Tasks';
import { Employee } from './Employee Components/Employee';
import Calendar from './Calendar Components/Calendar';
import Analytics from './Analytics Components/Analytics';
import KanbanBoard from './Kanban Components/KanbanBoard';
import { Home } from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'calendar',
        element: <Calendar />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'kanban',
        element: <KanbanBoard />
      },
      {
        path: 'employees',
        element: <Employee />
      },
      {
        path: '',
        element: <Home />
      }
    ]
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
