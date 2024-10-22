import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import useApi from '~/hooks/useApi';
import { useSnackbar } from 'react-simple-snackbar';
import { useHistory } from "react-router-dom";
import DashboardPage from ".";


jest.mock('~/hooks/useApi');
jest.mock('react-simple-snackbar');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),  // Importa o restante da biblioteca
  useHistory: jest.fn(),  // Mock do hook useHistory
}));


describe('DashboardPage', () => {
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

  
  test('renders the DashboardPage', () => {
    const mockSendRequest = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      sendRequest: mockSendRequest,
      loading: false,
      error: null
    });
    render(<DashboardPage />);
    
    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('columns')).toBeInTheDocument();

  });

  test('shows error modal when there is an error', () => {
    (useApi as jest.Mock).mockReturnValue({ data: [], loading: false, error: true, sendRequest: jest.fn() });
    (useSnackbar as jest.Mock).mockReturnValue([jest.fn()]);
  
    render(<DashboardPage />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Ocorreu um erro ao realizar operação!/i)).toBeInTheDocument();
  });

  test('calls searchByCpf when a valid CPF is entered', () => {
    const mockSendRequest = jest.fn();
    (useApi as jest.Mock).mockReturnValue({ data: [], loading: false, error: null, sendRequest: mockSendRequest });
    (useSnackbar as jest.Mock).mockReturnValue([jest.fn()]);
  
    render(<DashboardPage />);
  
    const searchBarInput = screen.getByPlaceholderText(/digite um cpf válido/i);
    fireEvent.change(searchBarInput, { target: { value: '098.165.164-03' } });
  
    expect(mockSendRequest).toHaveBeenCalledWith({
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      url: `${process.env.VITE_API_HOST}/registrations?cpf=09816516403`,
    });
  });

  test('calls refreshData when refresh button is clicked', () => {
    const mockSendRequest = jest.fn();
    (useApi as jest.Mock).mockReturnValue({ data: [], loading: false, error: null, sendRequest: mockSendRequest });
    (useSnackbar as jest.Mock).mockReturnValue([jest.fn()]);
  
    render(<DashboardPage />);
  
    const refreshButton = screen.getByTestId('refresh-button');
    fireEvent.click(refreshButton);
  
    expect(mockSendRequest).toHaveBeenCalledWith({
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      url: `${process.env.VITE_API_HOST}/registrations`,
    });
  });

  test('removes user when delete is confirmed in the modal', () => {
    const mockSendRequest = jest.fn();
    const mockSnackbar = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: [{ 
        id: '1', 
        employeeName: 'John Doe', 
        cpf: '09816516403', 
        admissionData:'12/12/2023',
        email:'jon@teste.com',
        status: 'REVIEW'
      }],
      loading: false,
      error: null,
      sendRequest: mockSendRequest,
    });
    (useSnackbar as jest.Mock).mockReturnValue([mockSnackbar]);
  
    render(<DashboardPage />);
  
    const deleteButton = screen.getByTestId('delete-icon');
    fireEvent.click(deleteButton);
  
    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirmButton);
  
    expect(mockSendRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      url: `${process.env.VITE_API_HOST}/registrations/1`,
      data: { 
        id: '1', 
        employeeName: 'John Doe', 
        cpf: '09816516403',
        admissionData:'12/12/2023',
        email:'jon@teste.com',
        status: 'REVIEW'
      },
      headers: { 'Content-Type': 'application/json' },
    });
  
    expect(mockSnackbar).toHaveBeenCalledWith('Usuário removido com sucesso!');
  });

  test('updates user status when confirmed in the modal', () => {
    const mockSendRequest = jest.fn();
    const mockSnackbar = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      data: [
        { 
          id: '1', 
          employeeName: 'John Doe', 
          cpf: '09816516403', 
          admissionData:'12/12/2023',
          email:'jon@teste.com',
          status: 'REVIEW'
        }
      ],
      loading: false,
      error: null,
      sendRequest: mockSendRequest,
    });
    (useSnackbar as jest.Mock).mockReturnValue([mockSnackbar]);
  
    render(<DashboardPage />);
  
    const statusButton = screen.getByRole('button', { name: /Aprovar/i });
    fireEvent.click(statusButton);
  
    const confirmButton = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(confirmButton);
  
    expect(mockSendRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: `${process.env.VITE_API_HOST}/registrations/1`,
      data: { 
        id: '1', 
        employeeName: 'John Doe', 
        cpf: '09816516403', 
        admissionData:'12/12/2023',
        email:'jon@teste.com',
        status: 'APPROVED' },
      headers: { 'Content-Type': 'application/json' },
    });
  
    expect(mockSnackbar).toHaveBeenCalledWith('Alteração aplicada com sucesso!');
  });

});







