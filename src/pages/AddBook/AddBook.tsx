import styled from "styled-components";
import { Container } from "../../general/components/Container";
import { auth, db } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const StyledContainer = styled(Container)`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 300px;
  text-align: center;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: 300px;
`;

const Article = styled.article`
  position: relative;
  svg {
    position: absolute;
    left: 0;
    width: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.6rem;
  padding-left: 30px;
  margin-bottom: 15px;
  border-bottom: 2px solid ${(p) => p.theme.colors.primary};
  &:focus {
    outline: none;
  }
`;
const Btn = styled.button`
  max-width: 100px;
  margin: 0 auto;
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

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  if (!auth.currentUser) return <Navigate to={"/login"}></Navigate>;

  const handleSubmit = async (e: any) => {
    const docRef = await addDoc(collection(db, "books"), {
      title: e.target.title.value,
      author: e.target.author.value,
    });
    setLoading(false);
    if (docRef.id) {
      e.target.title.value = "";
      e.target.author.value = "";
      alert("Your book added");
    }
  };
  return (
    <StyledContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          handleSubmit(e);
        }}
      >
        <h1>Add a book</h1>
        <Article>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(33,150,243,1)"
          >
            <path d="M3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H6.5C4.567 22 3 20.433 3 18.5ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM5 15.3368C5.45463 15.1208 5.9632 15 6.5 15H19V4H6C5.44772 4 5 4.44772 5 5V15.3368Z"></path>
          </svg>
          <Input placeholder="Book title" type="text" name="title" required />
        </Article>
        <Article>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(33,150,243,1)"
          >
            <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"></path>
          </svg>
          <Input type="text" name="author" placeholder="Book author" required />
        </Article>
        <Btn disabled={loading} style={{ opacity: loading ? "0.7" : "" }}>
          Submit
        </Btn>
      </Form>
    </StyledContainer>
  );
};

export default AddBook;
