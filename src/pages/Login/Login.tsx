import styled from "styled-components";
import { Container } from "../../general/components/Container";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)`
  height: calc(100vh - 57.5px);
  padding-top: 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  & > div {
    display: grid;
    gap: 10px;
    a {
      text-decoration: none;
      font-size: 1.6rem;
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;

const Form = styled.form`
  max-width: 250px;
  width: 100%;
  text-align: center;
  input {
    display: block;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Article = styled.article`
  position: relative;
  svg {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
  }
  .right {
    position: absolute;
    right: 0;
    left: 90%;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 30px;
  font-size: 1.6rem;
  margin-bottom: 15px;
  border-bottom: 2px solid ${(p) => p.theme.colors.primary};
  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  font-size: 1.6rem;
  padding: 4px 8px;
  background-color: ${(p) => p.theme.colors.primary};
  color: white;
  border-radius: 6px;
  transition: 500ms all;
  &:hover {
    opacity: 0.8;
  }
`;

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    if (e.target.mail) e.target.mail.value;

    signInWithEmailAndPassword(
      auth,
      e.target.mail.value,
      e.target.pass.value
    ).then(() => {
      if (auth.currentUser) {
        navigate("/");
      }
    });
  };
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // GoogleAuthProvider.credentialFromResult(result);
        if (result.user.uid) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (auth.currentUser) return <Navigate to={"/"}></Navigate>;
  return (
    <StyledContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Title>Login</Title>
        <Article>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(33,150,243,1)"
          >
            <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
          </svg>
          <Input type="email" required placeholder="Email" name="mail" />
        </Article>
        <Article>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(33,150,243,1)"
          >
            <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
          </svg>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="pass"
            className="input"
          />
          <svg
            onClick={() => setShow(!show)}
            className="right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(33,150,243,1)"
          >
            <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
          </svg>
        </Article>
        <Btn>Login</Btn>
      </Form>
      <div>
        <Btn onClick={() => handleClick()}>Login with google</Btn>
        <Link to={"/signup"}>I haven't my account</Link>
      </div>
    </StyledContainer>
  );
};

export default Login;
