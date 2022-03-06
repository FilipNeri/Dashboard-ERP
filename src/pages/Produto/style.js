import styled from "vue-styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin: 5px;
  }
  input {
    margin-left: 10px;
    border-radius:5px ;
    padding: 5px;
    border: solid 1px #000;
  }
  .valor {
    margin-left: 29px;
    width: 70px;
  }
  .estoque {
    width: 70px;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    height: 40px;
    width: 300px;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  background-color: #005bae;
  font-size: 20px;
  width: 125px;
  height: 40px;
  border-radius: 7px;
  color: white;

`;
