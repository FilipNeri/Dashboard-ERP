<template>
  <Container>
    <img src="../../assets/fiesc.png" alt="IconeFiesc" />
    <ContainerNavigation>
      
      <router-link to="/" class="tituloNavegacao">Venda</router-link>
      <router-link to="/produto" class="tituloNavegacao"
        >Produto</router-link
      >
      <router-link to="/relatorio" class="tituloNavegacao"
        >Relatórios</router-link
      >
      <router-link to="/listagemvendas" class="tituloNavegacao"
        >Listagem de Vendas</router-link
      >
    </ContainerNavigation>
  </Container>
</template>

<script>
import { Container, ContainerNavigation } from "./style";
export default {
  name: "SideBar",
  components: { Container, ContainerNavigation },
};
</script>