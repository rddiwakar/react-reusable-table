
import './App.css';
import TableSection from './Component/TableSection';
import styled from 'styled-components'

const Main = styled.div`
  padding: 15px;
  font-family: "Open Sans", sans-serif;
`
const MainHeading = styled.h1`
  text-align: center;
  font-size: 3.2rem;
  margin: 20px 0 60px 0;
`

function App() {
  
  return (
    <Main>
      <MainHeading>Reusable React Table Component</MainHeading>
      <TableSection Title='transactions' />
      <TableSection Title='holdings' />
    </Main>
  );
}

export default App;
