<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <label>Produto:<input type="text"/></label>
      <label>Quantidade:<input class="estoque" type="text"/></label>
      <label>Valor Unitário:<input type="text"/></label>
      <label>Valor Total:<input type="text"/></label>
      <Button>Alterar</Button>
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../Header/Header.vue";
import { Container, Content, Button } from "./style";
import Footer from "../Footer/Footer.vue";
import produtos from "../../services/produtos";

export default {
  name: "EditarVendas",
  components: {
    Header,
    Container,
    Button,
    Content,
    Footer,
  },
  data() {
    return {
      titulo: "Editar",
      tipo: "",
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.tipo = localStorage.getItem(produtos).tipo;
  },
};
</script>
