
export const cpfMask= (cpf: string): string => {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
}

export const removeMask = (value: string): string => {
  return value.replace(/\D/g, '');
}