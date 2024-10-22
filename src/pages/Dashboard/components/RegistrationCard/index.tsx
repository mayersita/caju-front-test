import { ButtonSmall } from "~/components/atoms/Buttons"
import * as S from "./styles"
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi"
import { UserData } from "~/types"
import { StatusTypes, StatusVariants } from "~/utils/consts"

type Props = {
  data: UserData
  actionCard: (data: UserData, status: StatusVariants) => void
}

const RegistrationCard = ({data, actionCard}: Props) => {
  return (
    <S.Card data-testid="card">
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {
          data.status === StatusTypes.REVIEW ? 
          (
            <>
              <ButtonSmall onClick={() => actionCard(data, 'REPROVED')} $bgcolor="rgb(255, 145, 154)" >Reprovar</ButtonSmall>
              <ButtonSmall onClick={() => actionCard(data, 'APPROVED')} $bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
            </>
          )
          :
          <ButtonSmall onClick={() => actionCard(data, 'REVIEW')} $bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        }
        <HiOutlineTrash data-testid="delete-icon" onClick={() => actionCard(data, 'DELETE')}/>
      </S.Actions>
    </S.Card>
  )
}

export default RegistrationCard
