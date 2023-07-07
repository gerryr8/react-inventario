import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/fabricantes">Fabricantes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;