import styled from "styled-components"
import Modal from 'react-modal'

export const CModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  padding: 16px;
  background-color: #FBFBFF;
  align-self: center;
  justify-self: center;
  margin-top: 30vh;
  border-radius: 8px;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 250px;
    height: 200px;
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
`
export const LineButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
export const LineErrorButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`