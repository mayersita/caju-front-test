import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { useSnackbar } from 'react-simple-snackbar';
import { useHistory } from "react-router-dom";
import RegistrationCard from ".";


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


describe('RegistrarionCard', () => {
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

  
  test('renders the RegistrationCard with review user', () => {
    render(<RegistrationCard 
      data={
        {
          "admissionDate": "22/10/2023",
          "email": "luiz@caju.com.br",
          "employeeName": "Luiz Filho",
          "status": "REVIEW",
          "cpf": "56642105087",
          "id": "3"
        }
      } 
      actionCard={() => {}}
    />);
    
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText(/Luiz Filho/i)).toBeInTheDocument();
    expect(screen.getByText(/luiz@caju.com.br/i)).toBeInTheDocument();
    expect(screen.getByText(/Aprovar/i)).toBeInTheDocument();
    expect(screen.getByText(/Reprovar/i)).toBeInTheDocument();

  });

  test('renders the RegistrationCard with approved user', () => {
    render(<RegistrationCard 
      data={
        {
          "admissionDate": "22/10/2023",
          "email": "luiz@caju.com.br",
          "employeeName": "Luiz Filho",
          "status": "APPROVED",
          "cpf": "56642105087",
          "id": "3"
        }
      } 
      actionCard={() => {}}
    />);
    
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText(/Luiz Filho/i)).toBeInTheDocument();
    expect(screen.getByText(/luiz@caju.com.br/i)).toBeInTheDocument();
    expect(screen.getByText(/Revisar novamente/i)).toBeInTheDocument();

  });

  test('renders the RegistrationCard with reproved user', () => {
    render(<RegistrationCard 
      data={
        {
          "admissionDate": "22/10/2023",
          "email": "luiz@caju.com.br",
          "employeeName": "Luiz Filho",
          "status": "REPROVED",
          "cpf": "56642105087",
          "id": "3"
        }
      } 
      actionCard={() => {}}
    />);
    
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText(/Luiz Filho/i)).toBeInTheDocument();
    expect(screen.getByText(/luiz@caju.com.br/i)).toBeInTheDocument();
    expect(screen.getByText(/Revisar novamente/i)).toBeInTheDocument();

  });

});







