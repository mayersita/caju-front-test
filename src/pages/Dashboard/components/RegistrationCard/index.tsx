import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { UserData } from "~/types";
import { StatusTypes } from "~/utils/consts";

type Props = {
  data: UserData;
  actionCard: (data: UserData, status: string) => void
};

const RegistrationCard = ({data, actionCard}: Props) => {
  return (
    <S.Card>
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
              <ButtonSmall onClick={() => actionCard(data, 'REPROVED')} bgcolor="rgb(255, 145, 154)" >Reprovar</ButtonSmall>
              <ButtonSmall onClick={() => actionCard(data, 'APPROVED')} bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
            </>
          )
          :
          <ButtonSmall onClick={() => actionCard(data, 'REVIEW')} bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        }
        <HiOutlineTrash onClick={() => actionCard(data, 'DELETE')}/>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
