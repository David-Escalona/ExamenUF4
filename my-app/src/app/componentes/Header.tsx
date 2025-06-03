'use client';

import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 shadow">
      <div className="fw-bold fs-4 text-dark">David Escalona García</div>
      <nav>
        <div className="position-relative">
          <button
            className="btn btn-outline-dark"
            onClick={() => setOpen(!open)}
          >
            Navegación
          </button>
          {open && (
            <ul
              className="list-group position-absolute mt-2"
              style={{ minWidth: "150px", zIndex: 1000 }}
            >
              <li className="list-group-item p-0">
                <Link
                  href="/home"
                  className="d-block px-3 py-2 text-dark text-decoration-none"
                  onClick={() => setOpen(false)}
                >
                  Home 
                </Link>
                <li className=" p-0"></li>
                <Link
                  href="/movieexplorer"
                  className="d-block px-3 py-2 text-dark text-decoration-none"
                  onClick={() => setOpen(false)}
                >
                  MovieExplorer 
                </Link>
              </li>
              <li className="list-group-item p-0">
                <Link
                  href="/about"
                  className="d-block px-3 py-2 text-dark text-decoration-none"
                  onClick={() => setOpen(false)}
                >
                  About 
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;