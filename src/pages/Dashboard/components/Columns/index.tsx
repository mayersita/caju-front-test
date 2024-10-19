
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { UserData } from "~/types";

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

type Props = {
  registrations: UserData[] | null;
  actionCard: (data: UserData, status: string) => void
};
const Collumns = ({registrations, actionCard}: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.filter((user) => user.status === collum.status).map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                      actionCard={actionCard}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
