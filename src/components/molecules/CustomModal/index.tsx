import Button from '~/components/atoms/Buttons'
import { CModal, Container, LineButtons, LineErrorButton } from './styles'
import Loading from '~/components/atoms/Loading'

interface Props {
  openModal: boolean
  setOpenModal: (opt: boolean) => void
  title: string
  description: string
  actionConfirmButton: () => void
  actionCancelButton: () => void
  loading?: boolean
  isError: boolean
}


const CustomModal = ({
  openModal, 
  setOpenModal, 
  title, 
  description, 
  actionCancelButton, 
  actionConfirmButton,
  loading,
  isError
}: Props) => {
  return(
    <CModal
      appElement={document.getElementById('root') as HTMLElement}
      ariaHideApp={process.env.NODE_ENV !== 'test'}
      data-testid="custom-modal"
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      contentLabel={title}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <Container>
        <h2>{title}</h2>
        <h4>{description}</h4>
      </Container>
      {
        isError ?
        <LineErrorButton>
          <Button width='200px' onClick={() => actionCancelButton()} >
            Fechar
          </Button>
        </LineErrorButton>
        :
        <>
        {
          loading ? 
            <Loading width={'100px'} height={'100px'}/>
          :
          <LineButtons>
            <Button width='180px' onClick={() => actionCancelButton()} $bgColor='#EC162F'>
              Cancelar
            </Button>
            <Button width='180px' onClick={() => actionConfirmButton()} >
              Confirmar
            </Button>
          </LineButtons>
        }
        </>
      }
      
      
    </CModal>
  )
}

export default CustomModal