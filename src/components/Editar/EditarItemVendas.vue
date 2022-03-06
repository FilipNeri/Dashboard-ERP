<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <label>Produto:<input type="text" v-model="produto"/></label>
      <label>Quantidade:<input type="text" v-model="quantidade"/></label>
      <label>Valor Unitário:<input class="estoque" type="text" v-model="valor_unitario"/></label>
      <label>Valor Total:<input class="estoque" type="text" v-model="valor_total"/></label>
      <Button @click="alterarItemVendas(id,produto,cliente,quantidade,valor_unitario,valor_total)">Alterar</Button>
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../Header/Header.vue";
import { Container, Content, Button } from "./style";
import Footer from "../Footer/Footer.vue";
import ItemVenda from "../../services/itemVendas";
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
      produto:"",
      cliente:"",
      quantidade:"",
      valor_unitario:"",
      valor_total:"",
      id:""
    };
  },
  methods: {
      setandoVariaveis() {
      var obj = new Object();
      obj = JSON.parse(localStorage.getItem("itemvenda"));

      this.produto = obj.produto;
      this.cliente = obj.cliente;
      this.quantidade = obj.quantidade;
      this.valor_unitario = obj.valor_unitario;
      this.valor_total = obj.valor_total;
      this.id=obj.id;
    },
    async alterarItemVendas(id,produto,cliente,quantidade,valor_unitario,valor_total) {
    await ItemVenda.alterandoVendas({id,produto,cliente,quantidade,valor_unitario,valor_total}).then(response=>{
             Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.msg,
              showConfirmButton: false,
              timer: 2000,
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
