'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  username: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const activeUser = localStorage.getItem('activeUser');
      if (activeUser) {
        setUser(JSON.parse(activeUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener('activeUserChanged', checkUser);

    return () => {
      window.removeEventListener('activeUserChanged', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('activeUser');
    setUser(null);
    window.dispatchEvent(new Event('activeUserChanged'));
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.filter = 'brightness(90%)';
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.filter = 'brightness(100%)';
  };

  return (
    <header
      className="d-flex justify-content-between align-items-center p-3 shadow"
      style={{

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="d-flex align-items-center">
        <div className="fw-bold fs-4 text-dark">David Escalona García</div>
      </div>

      <div className="d-flex align-items-center">
        {user ? (
          <>
            <span className="me-3 text-dark">Hola, {user.username}</span>
            <Link
              href="/perfil"
              className="btn btn-outline-dark me-2"
              style={{ transition: 'all 1s ease' }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              👤 Mi Perfil
            </Link>
            <Link
              href="/usuarios"
              className="btn btn-outline-secondary me-2"
              style={{ transition: 'all 1s ease' }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              👥 Usuarios
            </Link>
            <button
              className="btn btn-danger"
              style={{ transition: 'all 1s ease' }}
              onClick={handleLogout}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link
              href="/home"
              className="btn btn-danger me-2"
              style={{ transition: 'all 1s ease' }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              HOME
            </Link>
            <Link
              href="/login"
              className="btn btn-primary me-2"
              style={{ transition: 'all 1s ease' }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="btn btn-success"
              style={{ transition: 'all 1s ease' }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              Registro
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;