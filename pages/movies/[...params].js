import Seo from "../../components/Seo";
import Image from "next/image";
import styled from "styled-components";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const Wrapper = styled.div`
  position: relative;
`;
const ImgWrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  padding: 1rem 0;
`;
const MovieInfo = styled.div`
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const Detail = ({ params, results }) => {
  const [title] = params || [];
  const { data } = results.queries[0].state;
  return (
    <Wrapper>
      <Seo title={title} />
      <ImgWrapper>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt="Poster"
          priority
          width={500}
          height={700}
        />
      </ImgWrapper>
      <h4>{title}</h4>
      <MovieInfo>{data.overview}</MovieInfo>
    </Wrapper>
  );
};

export default Detail;

export const getServerSideProps = async ({ params: { params } }) => {
  const queryFn = async (param) => {
    const response = await fetch(`http://localhost:3000/api/movies/${param}`);
    const data = await response.json();
    return data;
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["movie"], () => queryFn(params[1]));
  /*   const results = await (
    await fetch(`http://localhost:3000/api/movies/${params[1]}`)
  ).json(); */
  return {
    props: {
      params,
      results: dehydrate(queryClient),
    },
  };
};
