import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./Container";
import { auth } from "../../firebase/firebase";

const StyledHeader = styled.header`
  background-color: ${(p) => p.theme.colors.primary};
  padding: 10px 0;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: white;
    font-weight: 700;
    font-size: 2.5rem;
  }
  ul {
    display: flex;
    gap: 30px;
  }
  ul > a {
    font-size: 1.6rem;
    font-weight: 400;
    transition: 500ms all;
    &:hover {
      opacity: 0.6;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 20px;
    & > a {
      font-size: 1.6rem !important;
    }
  }

  article {
    max-width: 40px;
    max-height: 40px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    height: auto;
    img {
      width: 30px;
      border-radius: 50%;
    }
  }
`;
const Header = () => {
  return (
    <StyledHeader>
      <StyledContainer>
        <Link to={"/"}>LOGO</Link>

        {auth.currentUser ? (
          <div>
            <Link to={"/addBook"}>Add Book</Link>
            <article>
              <img
                src={
                  auth.currentUser.photoURL?.length
                    ? auth.currentUser.photoURL
                    : "/avatar.svg"
                }
                alt="avatar"
              />
            </article>
          </div>
        ) : (
          <ul>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </ul>
        )}
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
