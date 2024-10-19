import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { validateDocument, validateEmail, validateName } from "~/utils/functions";
import { useState } from "react";
import { cpfMask, removeMask } from "~/utils/masks";

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [admissionDate, setAdmissionDate] = useState('')
  const [showError, setShowError] = useState('')

  const registerUser = () => {
    //TODO: fazer chamada de salvar usuario e navegar para dashboard
  }

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField 
          placeholder="Preencha o nome completo" 
          label="Nome completo" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          onBlur={() => {
            if (Boolean(name) && !validateName(name)) {
               setShowError('name')
            } else {
              setShowError('')
            }
          }}
          error={showError === 'name' ? 'Nome inválido' : ''}
        />
        <TextField 
          placeholder="Preencha o e-mail" 
          label="E-mail" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          onBlur={() => {
            if (Boolean(email) && !validateEmail(email)) {
               setShowError('email')
            } else {
              setShowError('')
            }
          }}
          error={showError === 'email' ? 'E-mail inválido' : ''}
          />
        <TextField 
          label="CPF"
          type="text"
          value={document}
          maxLength={14} 
          placeholder="000.000.000-00"
          onChange={(e) => setDocument(cpfMask(e.target.value))} 
          onBlur={() => {
            if (Boolean(document) && !validateDocument(removeMask(document))) {
              setShowError('document')
            } else {
              setShowError('')
            }
          }}
          error={showError === 'document' ? 'CPF inválido' : ''}

        />
        <TextField 
          label="Data de admissão" 
          type="date" value={admissionDate} 
          onChange={(e) => setAdmissionDate(e.target.value)}
          onBlur={() => {
            if (!Boolean(admissionDate)) {
              setShowError('admissionDate')
            } else {
              setShowError('')
            }
          }}
          error={showError === 'admissionDate' ? 'Por favor escolha uma data válida' : ''}
        />
        <Button onClick={() => registerUser()} >Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
