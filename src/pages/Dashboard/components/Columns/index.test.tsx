import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { useSnackbar } from 'react-simple-snackbar';
import { useHistory } from "react-router-dom";
import Collumns from ".";


// Mock do hook useApi
jest.mock('~/hooks/useApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-simple-snackbar', () => ({
  useSnackbar: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),  // Importa o restante da biblioteca
  useHistory: jest.fn(),  // Mock do hook useHistory
}));


describe('Columns', () => {
  let mockOpenSnackbar: jest.Mock;
  let mockHistoryPush: jest.Mock;

  beforeEach(() => {
    // Simula a função retornada pelo `useSnackbar`
    mockOpenSnackbar = jest.fn();
    (useSnackbar as jest.Mock).mockReturnValue([mockOpenSnackbar]);
  });

  beforeEach(() => {
    // Simula a função de navegação (push) que o useHistory retorna
    mockHistoryPush = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({
      push: mockHistoryPush,
    });
  });

  
  test('renders the Columns component', () => {
    render(<Collumns 
      registrations={[
        {
          "admissionDate": "22/10/2023",
          "email": "luiz@caju.com.br",
          "employeeName": "Luiz Filho",
          "status": "APPROVED",
          "cpf": "56642105087",
          "id": "3"
        }
      ]} 
      actionCard={() => {}} 
      loading={false} 
    />);
    
    expect(screen.getByTestId('columns')).toBeInTheDocument();
    expect(screen.getByText(/Aprovado/i)).toBeInTheDocument();
    expect(screen.getByText(/Reprovado/i)).toBeInTheDocument();
    expect(screen.getByText(/Pronto para revisar/i)).toBeInTheDocument();

  });

});







