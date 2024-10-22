import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { useSnackbar } from 'react-simple-snackbar';
import { BrowserRouter, useHistory } from "react-router-dom";
import { SearchBar } from ".";


// Mock do hook useApi
jest.mock('~/hooks/useApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-simple-snackbar', () => ({
  useSnackbar: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));


describe('Searchbar', () => {
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

  
  test('renders the SearchBar', () => {
    render(
      <SearchBar refreshData={jest.fn()} searchByCpf={jest.fn()} />);
    
      expect(screen.getByPlaceholderText(/digite um cpf válido/i)).toBeInTheDocument();
      expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /nova admissão/i })).toBeInTheDocument();

  });
  
  test('calls searchByCpf when a valid CPF is entered', async () => {
    const mockSearchByCpf = jest.fn();
  
    render(
      <BrowserRouter>
        <SearchBar refreshData={jest.fn()} searchByCpf={mockSearchByCpf} />
      </BrowserRouter>
    );
  
    const cpfInput = screen.getByPlaceholderText(/digite um cpf válido/i);
    
    fireEvent.change(cpfInput, { target: { value: '098.165.164-03' } });
    
    await waitFor(() => {
      expect(mockSearchByCpf).toHaveBeenCalledWith('09816516403');
    });
  });

  test('does not call searchByCpf with invalid CPF', async () => {
    const mockSearchByCpf = jest.fn();
  
    render(
      <BrowserRouter>
        <SearchBar refreshData={jest.fn()} searchByCpf={mockSearchByCpf} />
      </BrowserRouter>
    );
  
    const cpfInput = screen.getByPlaceholderText(/digite um cpf válido/i);
    
    // Digitar CPF incompleto
    fireEvent.change(cpfInput, { target: { value: '098.165' } });
  
    await waitFor(() => {
      expect(mockSearchByCpf).not.toHaveBeenCalled();
    });
  });

  test('calls refreshData when refresh button is clicked', () => {
    const mockRefreshData = jest.fn();
  
    render(
      <BrowserRouter>
        <SearchBar refreshData={mockRefreshData} searchByCpf={jest.fn()} />
      </BrowserRouter>
    );
  
    const refreshButton = screen.getByTestId('refresh-button');
    fireEvent.click(refreshButton);

    expect(mockRefreshData).toHaveBeenCalled();
  });

  test('redirects to new admission page on button click', () => {
    const mockHistoryPush = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({ push: mockHistoryPush });
  
    render(
      <BrowserRouter>
        <SearchBar refreshData={jest.fn()} searchByCpf={jest.fn()} />
      </BrowserRouter>
    );
  
    // Simulate button click
    const button = screen.getByRole('button', { name: /nova admissão/i });
    fireEvent.click(button);
  
    // Check if the push method was called with the correct URL
    expect(mockHistoryPush).toHaveBeenCalledWith('/new-user');
  });

});







