import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  .active {
    color: tomato;
  }
`;

const Logo = styled(Image)`
  max-width: 100px;
  margin-bottom: 5px;
`;

const LinkBox = styled.div`
  display: flex;
  gap: 10px;
`;

const LinkTag = styled(Link)`
  font-weight: 100px;
  margin-bottom: 5px;
`;

const NavBar = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Logo src="/vercel.svg" width={80} height={80} alt="Logo" />
      <LinkBox>
        <LinkTag href="/" className={router.pathname === "/" && "active"}>
          Home
        </LinkTag>
        <LinkTag
          href="/about"
          className={router.pathname === "/about" && "acitve"}
        >
          About
        </LinkTag>
      </LinkBox>
    </Wrapper>
  );
};

export default NavBar;
