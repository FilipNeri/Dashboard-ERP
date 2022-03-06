<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <label>Cliente:<input type="text" v-model="cliente"/></label>
      <label>Data:<input type="text" v-model="created_at"/></label>
      <label>Valor Total:<input class="estoque" type="text" v-model="valor_total"/></label>
      <Button @click="alterarVendas(id,cliente,created_at,valor_total)">Alterar</Button>
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../Header/Header.vue";
import { Container, Content, Button } from "./style";
import Footer from "../Footer/Footer.vue";
import Vendas from "../../services/vendas";
import Swal from "sweetalert2";
export default {
  name: "EditarListaVendas",
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
      cliente:"",
      created_at:"",
      valor_total:"",
      id:""
    };
  },
  methods: {
      setandoVariaveis() {
      var obj = new Object();
      obj = JSON.parse(localStorage.getItem("listavendas"));

      this.cliente = obj.cliente;
      this.created_at = obj.created_at;
      this.valor_total = obj.valor_total;
      this.id=obj.id;

    },
    async alterarVendas(id,cliente,created_at,valor_total) {
    await Vendas.alterandoVendas({id,cliente,created_at,valor_total}).then(response=>{
             Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.msg,
              showConfirmButton: false,
              timer: 2500,
            });
        })
        this.$router.push("/");
    },
  },
  mounted() {
    this.setandoVariaveis()
  },
};
</script>
