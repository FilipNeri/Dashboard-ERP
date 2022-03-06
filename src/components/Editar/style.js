import styled from "vue-styled-components"

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

`
export const Content = styled.div`
display: flex;
flex-direction: column;
label{
  margin-top: 5px;
}
input{
  margin-left: 5px;
}
button{
  margin-top: 20px;
}

`
export const Button = styled.button`
  background-color: #005bae;
  font-size: 20px;
  width: 125px;
  height: 40px;
  border-radius: 7px;
  color: white;

`;