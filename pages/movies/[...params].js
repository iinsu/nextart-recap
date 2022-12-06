import Seo from "../../components/Seo";
import Image from "next/image";
import styled from "styled-components";

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
  return (
    <Wrapper>
      <Seo title={title} />
      <ImgWrapper>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`}
          alt="Poster"
          width={500}
          height={700}
        />
      </ImgWrapper>
      <h4>{title}</h4>
      <MovieInfo>{results.overview}</MovieInfo>
    </Wrapper>
  );
};

export default Detail;

export const getServerSideProps = async ({ params: { params } }) => {
  const results = await (
    await fetch(`http://localhost:3000/api/movies/${params[1]}`)
  ).json();
  return {
    props: {
      params,
      results,
    },
  };
};
