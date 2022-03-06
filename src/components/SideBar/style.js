import styled from 'vue-styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  position:fixed;
  background-color: #005bae;
`
export const ContainerNavigation = styled.div`
display: flex;
flex-direction: column;
padding: 6px;
margin-top:50px ;

.tituloNavegacao {
  font-size: 25px;
  padding: 5px;
  color: #FFF;
  text-decoration: none;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: #005bae;
  
}
.tituloNavegacao:hover {
  color: #191970;

  transition: all 0.5s ease;
  filter: brightness(85%);
}
`