import { HiRefresh } from "react-icons/hi"
import { useHistory } from "react-router-dom"
import Button from "~/components/atoms/Buttons"
import { IconButton } from "~/components/atoms/Buttons/IconButton"
import TextField from "~/components/atoms/TextField"
import routes from "~/router/routes"
import * as S from "./styles"
import { useEffect, useState } from "react"
import { cpfMask, removeMask } from "~/utils/masks"
import { validateDocument } from "~/utils/functions"


interface Props {
  refreshData: () => void
  searchByCpf: (cpf: string) => void
}

export const SearchBar = ({refreshData, searchByCpf}: Props) => {
  const [document, setDocument] = useState('')
  const history = useHistory()

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser)
  }

  useEffect(() => {
    if (document.length === 14 && validateDocument(removeMask(document))) {
      searchByCpf(removeMask(document))
    }
  },[document, searchByCpf])
  
  return (
    <S.Container>
      <TextField 
        placeholder="Digite um CPF válido" 
        type="text"
        value={document}
        maxLength={14} 
        onChange={(e) => setDocument(cpfMask(e.target.value))} 
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={refreshData}>
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  )
}
