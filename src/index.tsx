import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Home';
import InfiniteQuery from './InfiniteQuery';
import reportWebVitals from './reportWebVitals';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Paginator from './Paginator';
import Mutations from './Mutations';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/paginator" element={<Paginator />} />
          <Route path="/infinity-query" element={<InfiniteQuery />} />
          <Route path="/mutations" element={<Mutations />} />
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
