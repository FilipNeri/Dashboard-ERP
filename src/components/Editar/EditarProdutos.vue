<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <label>Produto:<input type="text" v-model="nome"/></label>
      <label>Valor:<input class="valor" type="text" v-model="valor"/></label>
      <label
        >Estoque:<input class="estoque" type="text" v-model="estoque"
      /></label>
      <Button @click="alterarProdutos(id,nome,valor,estoque)">Alterar</Button>
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../Header/Header.vue";
import { Container, Content, Button } from "./style";
import Footer from "../Footer/Footer.vue";
import Produtos from "../../services/produtos";
import Swal from "sweetalert2";

export default {
  name: "EditarProdutos",
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
      nome: "",
      valor: "",
      estoque: "",
      id:""
    };
  },
  methods: {
    setandoVariaveis() {
      var obj = new Object();
      obj = JSON.parse(localStorage.getItem("produto"));
 
      this.nome = obj.nome;
      this.valor = obj.valor;
      this.estoque = obj.estoque;
      this.id=obj.id;

    },
    async alterarProdutos(id,nome,valor,estoque) {
    await Produtos.alterandoProdutos({id,nome,valor,estoque}).then(response=>{
             Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.msg,
              showConfirmButton: false,
              timer: 2500,
            });
        })
        this.$router.push("/produto");
    },
  },
  mounted() {
    this.setandoVariaveis();
  },
};
</script>
