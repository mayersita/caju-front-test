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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    document: '',
    admissionDate: '',
  });

  const goToHome = () => history.push(routes.dashboard)

  useEffect(() => {
    if (error) {
      setVariant(Variant.ERROR)
      setOpenModal(true)
    }
  }, [error])

  const invalidUser = () => {
    return (
      !name || Boolean(errors.name) || 
      !email || Boolean(errors.email) || 
      !document || Boolean(errors.document) || 
      !admissionDate || Boolean(errors.admissionDate)
    )
  }

  const registerUser = () => {
    if (invalidUser()) {
      openSnackbar('Preencha os campos corretamente antes de continuar!')
    } else {
      setOpenModal(true)
    }
  }

  const handleValidation = (value: string, field: string, validator: (value: string) => boolean) => {
    const customErrorMessages: { [key: string]: string } = {
      name: 'Nome inválido. Por favor, preencha o nome completo.',
      email: 'E-mail inválido. Insira um e-mail válido.',
      document: 'CPF inválido. Verifique o formato.',
      admissionDate: 'Por favor, selecione uma data válida.',
    }
  
    if (!validator(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: customErrorMessages[field],
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }))
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
          error={errors.name}
        />
        
        <TextField 
          id="email"
          placeholder="Preencha o e-mail" 
          label="E-mail" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          onBlur={() => handleValidation(email, 'email', validateEmail)}
          error={errors.email}
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
          error={errors.document}
        />
        
        <TextField 
          id="data"
          label="Data de admissão" 
          type="date" 
          value={admissionDate} 
          onChange={(e) => setAdmissionDate(e.target.value)}
          onBlur={() => handleValidation(admissionDate, 'admissionDate', (val) => Boolean(val))}
          error={errors.admissionDate}
        />
        
        <Button onClick={registerUser} $isDisabled={invalidUser()} >Cadastrar</Button>
      </S.Card>
      
      <CustomModal 
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={variant.title}
        description={variant.description} 
        loading={loading}
        isError={Boolean(error)}
        actionConfirmButton={() => {
          if (invalidUser()) {
            openSnackbar('Verifique os campos incorretos e tente novamente!')
          } else {
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
          }
        }}
        actionCancelButton={() => setOpenModal(false)}
      />
    </S.Container>
  )
}

export default NewUserPage
