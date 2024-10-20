
import * as S from "./styles"
import RegistrationCard from "../RegistrationCard"
import { UserData } from "~/types"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { Card } from "../RegistrationCard/styles"
import { StatusVariants } from "~/utils/consts"

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
]

type Props = {
  registrations: UserData[] | null
  actionCard: (data: UserData, status: StatusVariants) => void
  loading: boolean
}
const Collumns = ({registrations, actionCard, loading}: Props) => {
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
                {
                  loading ? 
                  <Card>
                    <Skeleton count={5}/> 
                  </Card>
                    :
                    <>
                    {registrations?.filter((user) => user.status === collum.status).map((registration) => {
                      return (
                        <RegistrationCard
                          data={registration}
                          key={registration.id}
                          actionCard={actionCard}
                        />
                      )
                    })}
                    </>
                }
              
                
              </S.CollumContent>
            </>
          </S.Column>
        )
      })}
    </S.Container>
  )
}
export default Collumns
