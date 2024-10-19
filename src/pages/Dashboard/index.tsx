import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { UserData } from "~/types";
import useApi from "~/hooks/useApi";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data, loading, error, sendRequest } = useApi<UserData[]>();

  useEffect(() => {
    sendRequest({ method: 'GET', url: `${import.meta.env.VITE_API_HOST}/registrations` })
}, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }
  return (
    <S.Container>
      <SearchBar 
        refreshData={
          () => {
            sendRequest({ method: 'GET', url: `${import.meta.env.VITE_API_HOST}/registrations` })
          }
        }
      />
      <Collumns 
        registrations={data}
        actionCard={
          (user, newStatus) => {
            if (newStatus !== 'DELETE') {
              sendRequest({ 
                headers: {'Content-Type': 'application/json'},
                method: 'PUT', 
                url: `${import.meta.env.VITE_API_HOST}/registrations/${user.id}`, 
                data: {...user, status: newStatus} 
              })
            } else {
              sendRequest({ 
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE', 
                url: `${import.meta.env.VITE_API_HOST}/registrations/${user.id}`, 
                data: user
              })
            }
        }
      }
      />
    </S.Container>
  );
};
export default DashboardPage;
