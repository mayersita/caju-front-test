import styled from "styled-components";

const Button = styled.button<{ width?: string, $bgColor?: string, minWidth?: string}>`
  width: ${(props) => props.width ?? ''};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color:  ${(props) => props.$bgColor ? props.$bgColor : '#64a98c'};
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: ${(props) => props.minWidth ?? ''};
    font-size: 12px;
    height: 36px;
  }
`

export const ButtonSmall = styled.button<{
  $bgcolor?: string
  color?: string
}>`
  min-width: 100px;
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.$bgcolor ?? 'none'};
  color: ${(props) => props.color ?? "#000"};
  margin: 0 16px 0 0;
  cursor: pointer;
`


export default Button
