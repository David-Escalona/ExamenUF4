'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
}

const MovieExplorer = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1',
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTM1MmEwNzQxM2JjZTBiOGMxZWZhZjlmMGVhNjBlOSIsIm5iZiI6MTc0ODg5MTc1Ni4yNTQwMDAyLCJzdWIiOiI2ODNkZjg2YzYyYzYwZDQyNTIyODkwYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5i73YVgNUXLvg3c5liKie-jRChjqFLB2ViEqauY1Ylw',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error('Error al obtener las películas');
        }

        const data = await res.json();
        setMovies(data.results);
      } catch (err: any) {
        console.error('Error fetching movies:', err.message);
      }
    };

    fetchMovies();

    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setActiveUser(user.username);
    }
  }, []);

  return (
    <div className="mt-4 bg-dark">
      <h1 className="mb-4">Catálogo de Películas Populares</h1>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-6 col-md-3 mb-4">
            <div className="card h-100">
              {movie.poster_path ? (
                <Link href={`/detalle`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
                  />
                </Link>
              ) : (
                <div
                  className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
                  style={{ height: '100px' }}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieExplorer;