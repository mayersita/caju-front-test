import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import CustomModal from '.';

describe('CustomModal', () => {
  const setOpenModal = jest.fn();
  const actionConfirmButton = jest.fn();
  const actionCancelButton = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders modal with title and description', () => {
    render(
      <CustomModal
        openModal={true}
        setOpenModal={setOpenModal}
        title="Modal Title"
        description="Modal Description"
        actionConfirmButton={actionConfirmButton}
        actionCancelButton={actionCancelButton}
        loading={false}
        isError={false}
      />
    );

    expect(screen.getByText(/modal title/i)).toBeInTheDocument();
    expect(screen.getByText(/modal description/i)).toBeInTheDocument();
  });

  test('calls actionCancelButton when cancel button is clicked', () => {
    render(
      <CustomModal
        openModal={true}
        setOpenModal={setOpenModal}
        title="Modal Title"
        description="Modal Description"
        actionConfirmButton={actionConfirmButton}
        actionCancelButton={actionCancelButton}
        loading={false}
        isError={false}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(actionCancelButton).toHaveBeenCalled();
  });

  test('calls actionConfirmButton when confirm button is clicked', () => {
    render(
      <CustomModal
        openModal={true}
        setOpenModal={setOpenModal}
        title="Modal Title"
        description="Modal Description"
        actionConfirmButton={actionConfirmButton}
        actionCancelButton={actionCancelButton}
        loading={false}
        isError={false}
      />
    );

    const confirmButton = screen.getByRole('button', { name: /confirmar/i });
    fireEvent.click(confirmButton);

    expect(actionConfirmButton).toHaveBeenCalled();
  });

  test('shows error button when isError is true', () => {
    render(
      <CustomModal
        openModal={true}
        setOpenModal={setOpenModal}
        title="Modal Title"
        description="Modal Description"
        actionConfirmButton={actionConfirmButton}
        actionCancelButton={actionCancelButton}
        loading={false}
        isError={true}
      />
    );

    expect(screen.getByRole('button', { name: /fechar/i })).toBeInTheDocument();
  });

  test('shows loading spinner when loading is true', () => {
    render(
      <CustomModal
        openModal={true}
        setOpenModal={setOpenModal}
        title="Modal Title"
        description="Modal Description"
        actionConfirmButton={actionConfirmButton}
        actionCancelButton={actionCancelButton}
        loading={true}
        isError={false}
      />
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('does not render modal when openModal is false', () => {
    const { container } = render(
      <CustomModal
        openModal={false}
        setOpenModal={setOpenModal}
        title="Modal Title"
        description="Modal Description"
        actionConfirmButton={actionConfirmButton}
        actionCancelButton={actionCancelButton}
        loading={false}
        isError={false}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
