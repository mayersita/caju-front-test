import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useFetch from "~/hooks/useFetch";

const DashboardPage = () => {
  const { data, loading, error } = useFetch<UserData[]>(`${process.env.REACT_APP_API_HOST}/registrations`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
}
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={[]} />
    </S.Container>
  );
};
export default DashboardPage;
