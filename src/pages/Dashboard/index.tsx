import Collumns from "./components/Columns"
import { useSnackbar } from 'react-simple-snackbar'
import * as S from "./styles"
import { SearchBar } from "./components/Searchbar"
import { UserData } from "~/types"
import useApi from "~/hooks/useApi"
import { useCallback, useEffect, useState } from "react"
import CustomModal from "~/components/molecules/CustomModal"
import { StatusVariants, Variant } from "~/utils/consts"

const DashboardPage = () => {
  const { data, loading, error, sendRequest } = useApi<UserData[]>()
  const [openSnackbar] = useSnackbar()
  const [openModal, setOpenModal] = useState(false)
  const [variant, setVariant] = useState(Variant.DELETE)
  const [user, setUser] = useState<UserData | null>(null)
  const [newStatus, setNewStatus] = useState<string>('')

  const sendData = (method: 'GET' | 'PUT' | 'DELETE', url: string, payload?: any) => {
    sendRequest({
      method,
      url: `${process.env.VITE_API_HOST}${url}`,
      ...(payload && { data: payload }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const getData = useCallback(() => {
    sendData('GET', '/registrations')
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (error) {
      setVariant(Variant.ERROR)
      setOpenModal(true)
    }
  }, [error])

  const handleSearch = (cpf: string) => {
    sendData('GET', `/registrations?cpf=${cpf}`)
  }

  const handleAction = (selectedUser: UserData, status: string) => {
    setUser(selectedUser)
    setNewStatus(status)
    setVariant(Variant[status as StatusVariants] || Variant.DELETE)
    setOpenModal(true)
  }

  const confirmAction = () => {
    if (!user) return

    if (newStatus === 'DELETE') {
      sendData('DELETE', `/registrations/${user.id}`, user)
      openSnackbar('Usuário removido com sucesso!')
    } else {
     sendData('PUT', `/registrations/${user.id}`, { ...user, status: newStatus })
      openSnackbar('Alteração aplicada com sucesso!')
    }
    setOpenModal(false)
  }

  return (
    <S.Container data-testid="dashboard-container">
      <SearchBar 
        data-testid="dashboard-search"
        refreshData={getData}
        searchByCpf={handleSearch}
      />
      <Collumns 
        data-testid="dashboard-columns"
        registrations={data}
        loading={loading}
        actionCard={handleAction}
      />
      <CustomModal 
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={variant.title}
        description={variant.description}
        isError={Boolean(error)}
        actionConfirmButton={confirmAction}
        actionCancelButton={() => setOpenModal(false)}
      />
    </S.Container>
  )
}

export default DashboardPage
