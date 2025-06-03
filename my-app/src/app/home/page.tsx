'use client';

import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=3',
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setActiveUser(user.username);
    }
  }, []);

  const handleAddMovie = (movie: Movie) => {
    if (!activeUser) return;
    const stored = localStorage.getItem(`favMovies_${activeUser}`);
    const favs: Movie[] = stored ? JSON.parse(stored) : [];
    const exists = favs.some((m) => m.id === movie.id);
    if (!exists) {
      favs.push(movie);
      localStorage.setItem(`favMovies_${activeUser}`, JSON.stringify(favs));
      alert('Película añadida a tu perfil');
    } else {
      alert('Ya has añadido esta película.');
    }
  };

  if (loading)
    return <p className="text-center mt-5">Cargando películas...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Error: {error}
      </p>
    );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Catálogo de Películas Populares</h1>
      
    </div>
  );
};

export default HomePage;