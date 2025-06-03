'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
}

const DetallePelicula = () => {
  const params = useParams();
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=es-ES`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTM1MmEwNzQxM2JjZTBiOGMxZWZhZjlmMGVhNjBlOSIsIm5iZiI6MTc0ODg5MTc1Ni4yNTQwMDAyLCJzdWIiOiI2ODNkZjg2YzYyYzYwZDQyNTIyODkwYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5i73YVgNUXLvg3c5liKie-jRChjqFLB2ViEqauY1Ylw',
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Cargando...</div>;

  return (
    <main className="d-flex flex-column align-items-center p-3 shadow bg-dark text-white">
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
      )}
      <p>{movie.overview}</p>
      <h1>Titulo: {movie.title}</h1>
      <p>Descripción: {movie.overview}</p>
      <p>Fecha de estreno: {movie.release_date}</p>

      <h3>Reparto</h3>
    </main>
  );
};

export default DetallePelicula;