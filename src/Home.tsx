import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="">
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/paginator">Paginator</Link>
        </li>
        <li>
          <Link to="/infinity-query">Infinite Query</Link>
        </li>
        <li>
          <Link to="/mutations">Mutations</Link>
        </li>
      </ul>
    </div>
  )
}