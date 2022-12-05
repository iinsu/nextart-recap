import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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

const Movie = styled.div`
  position: relative;
`;

const MovieImg = styled(Image)`
  max-width: 100%;
  border-radius: 12px;
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;

const MovieTitle = styled(Link)`
  position: relative;
  cursor: pointer;
  font-weight: bold;
`;

const fetchMovies = async () => {
  const response = await fetch(`/api/movies`);
  const json = await response.json();
  const { results } = json;
  return results;
};

export default function Home() {
  const movieList = useQuery(["movieList"], () => fetchMovies());
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  if (movieList.isLoading) {
    return <span>Loading...</span>;
  }
  if (movieList.isError) {
    return <span>Error: {movieList.error.message}</span>;
  }

  return (
    <Wrapper>
      <Seo title="Home" />
      {movieList.data.map((movie) => (
        <Movie key={movie.id}>
          <MovieImg
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Poster"
            fill
            sizes="100%"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
            onClick={() => onClick(movie.id, movie.original_title)}
          />
          <MovieTitle href={`/movies/${movie.original_title}/${movie.id}`}>
            {movie.original_title}
          </MovieTitle>
        </Movie>
      ))}
    </Wrapper>
  );
}
