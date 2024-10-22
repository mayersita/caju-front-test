import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
`;