import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 1rem 2rem;
  color: #666;

  > span {
    color: #1da1f2;
    font-weight: 600;
  }
`;

export const LikeButton = styled.button`
  background: white;
  border: 1px solid #1da1f2;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  color: #1da1f2;
  font-weight: 600;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #1da1f2;
    color: white;
  }
`;
