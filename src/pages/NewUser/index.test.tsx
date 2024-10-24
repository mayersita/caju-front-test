import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import NewUserPage from ".";
import useApi from '~/hooks/useApi';
import { useSnackbar } from 'react-simple-snackbar';
import { useHistory } from "react-router-dom";


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


describe('NewUserPage', () => {
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

  
  test('renders the NewUserPage component with inputs and button', () => {
    const mockSendRequest = jest.fn();
    (useApi as jest.Mock).mockReturnValue({
      sendRequest: mockSendRequest,
      loading: false,
      error: null
    });
    render(<NewUserPage />);
    
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de admissão/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();

  });

  test('shows error for invalid name', () => {
    render(<NewUserPage />);
    
    const nameInput = screen.getByLabelText(/nome completo/i);
    fireEvent.change(nameInput, { target: { value: '123' } });
    fireEvent.blur(nameInput);
    
    expect(screen.getByText(/Nome inválido. Por favor, preencha o nome completo./i)).toBeInTheDocument();
  });

  test('shows error for invalid email', () => {
    render(<NewUserPage />);
    
    const emailInput = screen.getByLabelText(/e-mail/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    expect(screen.getByText(/E-mail inválido. Insira um e-mail válido./i)).toBeInTheDocument();
  });

  test('shows error for invalid cpf', () => {
    render(<NewUserPage />);
    
    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: 'invalid-cpf' } });
    fireEvent.blur(cpfInput);
    
    expect(screen.getByText(/CPF inválido. Verifique o formato./i)).toBeInTheDocument();
  });

  test('shows error for invalid data', () => {
    render(<NewUserPage />);
    
    const dataInput = screen.getByLabelText(/Data de admissão/i);
    fireEvent.change(dataInput, { target: { value: '' } });
    fireEvent.blur(dataInput);
    
    expect(screen.getByText(/Por favor, selecione uma data válida./i)).toBeInTheDocument();
  });
  
  test('applies CPF mask correctly', () => {
    render(<NewUserPage />);
    
    const cpfInput = screen.getByLabelText(/cpf/i);
    fireEvent.change(cpfInput, { target: { value: '12345678901' } });
    
    expect((cpfInput as HTMLInputElement).value).toBe('123.456.789-01');
  });

  
  test('sends request to register user on form submission', () => {
    const mockSendRequest = jest.fn();

    // Define o que o mock deve retornar
    (useApi as jest.Mock).mockReturnValue({
      sendRequest: mockSendRequest,
      loading: false,
      error: null,
    });

    render(<NewUserPage />);

    // Preencher os campos
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: '098.165.164-03' } });
    fireEvent.change(screen.getByLabelText(/data de admissão/i), { target: { value: '2024-01-01' } });
    
    // Submeter o formulário
    const button = screen.getByRole('button', { name: /cadastrar/i });
    fireEvent.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
    
    expect(mockSendRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: expect.any(String), 
      data: {
        email: 'john@example.com',
        employeeName: 'John Doe',
        cpf: '09816516403', 
        admissionDate: '01/01/2024', 
        status: 'REVIEW'
      },
      headers: { 'Content-Type': 'application/json' }
    });
  });

  test('should show a snackbar when the user form is invalid', () => {
    render(<NewUserPage />);

    const submitButton = screen.getByText('Cadastrar');
    fireEvent.click(submitButton);
    expect(mockOpenSnackbar).toHaveBeenCalledWith('Preencha os campos corretamente antes de continuar!');
  });

});







