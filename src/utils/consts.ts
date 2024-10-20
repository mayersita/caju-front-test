export const StatusTypes = {
  REVIEW: 'REVIEW',
  APPROVED: 'APPROVED',
  REPROVED: 'REPROVED'
}

export const Variant = {
  'DELETE' : {
    title: 'Atenção!',
    description: ' Tem certeza de que deseja remover esse usuário?',
  },
  'APPROVED': {
    title: 'Aprovar usuário',
    description: 'Deseja aprovar esse usuario?'
  },
  'REPROVED': {
    title: 'Reprovar usuário',
    description: 'Deseja reprovar esse usuario?'
  },
  'REVIEW': {
    title: 'Revisar usuário',
    description: 'Deseja revisar esse usuario?'
  },
  'ADD': {
    title: 'Adicionar usuário',
    description: 'Deseja adicionar esse usuario?'
  },
  'ERROR': {
    title: 'Ocorreu um erro',
    description: 'Ocorreu um erro ao realizar operação!'
  },
}

export type StatusVariants= 'DELETE' | 'APPROVED' | 'REPROVED' | 'REVIEW' | 'ADD'