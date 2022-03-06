<template>
  <Container>
    <Titulo>{{ titulo }}</Titulo>
  </Container>
</template>

<script>
import {Container,Titulo} from "./style"
export default {
  name: "Header",
  components:{
    Container,
    Titulo
  },
  props: {
    titulo: String,
  }

};
</script>

