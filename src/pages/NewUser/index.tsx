import TextField from "~/components/atoms/TextField"
import * as S from "./styles"
import Button from "~/components/atoms/Buttons"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { IconButton } from "~/components/atoms/Buttons/IconButton"
import { useHistory } from "react-router-dom"
import routes from "~/router/routes"
import { formatDate, validateDocument, validateEmail, validateName } from "~/utils/functions"
import { useEffect, useState } from "react"
import { cpfMask, removeMask } from "~/utils/masks"
import useApi from "~/hooks/useApi"
import { UserData } from "~/types"
import { useSnackbar } from 'react-simple-snackbar'
import CustomModal from "~/components/molecules/CustomModal"
import { Variant } from "~/utils/consts"

const validateField = (field: string, validator: (value: string) => boolean): boolean => {
  return Boolean(field) && validator(field)
}

const NewUserPage = () => {
  const { loading, error, sendRequest } = useApi<UserData[]>()
  const [openSnackbar] = useSnackbar()
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const [variant, setVariant] = useState(Variant.ADD)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [admissionDate, setAdmissionDate] = useState('')
  const [showError, setShowError] = useState('')

  const goToHome = () => history.push(routes.dashboard)

  useEffect(() => {
    if (error) {
      setVariant(Variant.ERROR)
      setOpenModal(true)
    }
  }, [error])

  const invalidUser = (): boolean => !name || !email || !document || !admissionDate

  const registerUser = () => {
    if (invalidUser()) {
      openSnackbar('Preencha todos os campos antes de continuar!')
    } else {
      setOpenModal(true)
    }
  }

  const handleValidation = (value: string, field: string, validator: (value: string) => boolean) => {
    if (!validateField(value, validator)) {
      setShowError(field)
    } else {
      setShowError('')
    }
  }

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        
        <TextField 
          id="nome"
          placeholder="Preencha o nome completo" 
          label="Nome completo" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          onBlur={() => handleValidation(name, 'name', validateName)}
          error={showError === 'name' ? 'Nome inválido' : ''}
        />
        
        <TextField 
          id="email"
          placeholder="Preencha o e-mail" 
          label="E-mail" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          onBlur={() => handleValidation(email, 'email', validateEmail)}
          error={showError === 'email' ? 'E-mail inválido' : ''}
        />
        
        <TextField 
          id="cpf"
          label="CPF"
          type="text"
          value={document}
          maxLength={14} 
          placeholder="000.000.000-00"
          onChange={(e) => setDocument(cpfMask(e.target.value))} 
          onBlur={() => handleValidation(removeMask(document), 'document', validateDocument)}
          error={showError === 'document' ? 'CPF inválido' : ''}
        />
        
        <TextField 
          id="data"
          label="Data de admissão" 
          type="date" 
          value={admissionDate} 
          onChange={(e) => setAdmissionDate(e.target.value)}
          onBlur={() => handleValidation(admissionDate, 'admissionDate', (val) => Boolean(val))}
          error={showError === 'admissionDate' ? 'Por favor escolha uma data válida' : ''}
        />
        
        <Button onClick={registerUser}>Cadastrar</Button>
      </S.Card>
      
      <CustomModal 
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={variant.title}
        description={variant.description} 
        loading={loading}
        isError={Boolean(error)}
        actionConfirmButton={() => {
          sendRequest({ 
            headers: {'Content-Type': 'application/json'},
            method: 'POST', 
            url: `${process.env.VITE_API_HOST}/registrations`, 
            data: {
              email,
              employeeName: name,
              cpf: removeMask(document),
              admissionDate: formatDate(admissionDate),
              status: 'REVIEW'
            } 
          })
          setOpenModal(false)
          openSnackbar('Usuário adicionado com sucesso!')
        }}
        actionCancelButton={() => setOpenModal(false)}
      />
    </S.Container>
  )
}

export default NewUserPage
