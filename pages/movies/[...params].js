import Seo from "../../components/Seo";
import Image from "next/image";

export const getServerSideProps = async ({ params: { params } }) => {
  const results = await (
    await fetch(`http://localhost:3000/api/movies/${params[1]}`)
  ).json();
  console.log(results);
  return {
    props: {
      params,
      results,
    },
  };
};

const Detail = ({ params, results }) => {
  const [title] = params || [];
  return (
    <div style={{ position: "relative" }}>
      <Seo title={title} />

      <Image
        src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`}
        alt="Poster"
        width={500}
        height={700}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      />
      <h4>{title}</h4>
      <div>{results.overview}</div>
    </div>
  );
};

export default Detail;
