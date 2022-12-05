import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Seo from "../components/Seo";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  gap: 20px;
  h4 {
    font-size: 18px;
    text-align: center;
  }
`;

const Movie = styled.div``;

const MovieImg = styled(Image)`
  max-width: 100%;
  border-radius: 12px;
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;

export default function Home() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
    })();
  }, []);

  return (
    <Wrapper>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <>
          <Movie key={movie.id}>
            <MovieImg
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Poster"
              fill
            />
            <h4>{movie.original_title}</h4>
          </Movie>
        </>
      ))}
    </Wrapper>
  );
}
