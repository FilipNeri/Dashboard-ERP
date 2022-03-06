<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <Form>
        <label>Produto:<input type="text" v-model="nome"/></label>
        <label>Valor:<input class="valor" type="text" v-model="valor"/></label>
        <label
          >Estoque:<input class="estoque" type="text" v-model="estoque"
        /></label>
        <div class="button">
          <Button @click.prevent="cadastrar(nome, valor, estoque)"
            >Cadastrar</Button
          >
        </div>
      </Form>
      <Tabela style="margin-top:10px" :produtos="produtos" v-if="spinner==false"/>
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../../components/Header/Header.vue";
import Tabela from "../../components/Tabelas/TabelaProdutos.vue";
import Footer from "../../components/Footer/Footer.vue";

import Produtos from "../../services/produtos";

import Swal from "sweetalert2";

import { Container, Content, Form, Button } from "./style";

export default {
  name: "Produtos",
  components: {
    Header,
    Container,
    Form,
    Tabela,
    Button,
    Content,
    Footer,
  },
  data() {
    return {
      titulo: "Produtos",
      objetos: [],
      produtos: [],
      nome: "",
      valor: "",
      estoque: "",
      spinner:true
    };
  },
  methods: {
    async cadastrar(nome, valor, estoque) {
      if (nome == "" || valor == "" || estoque == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos",
          confirmButtonColor: "#005bae",
        });
      } else if (isNaN(parseFloat(valor))) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "O campo valor precisa ser um número",
          confirmButtonColor: "#005bae",
        });
      } else if (isNaN(parseFloat(estoque))) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "O campo valor precisa ser um número",
          confirmButtonColor: "#005bae",
        });
      } else {
        await Produtos.inserindoProdutos({ nome, valor, estoque }).then(
          (response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.msg,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        );
        this.zerarVariaveis()
        this.getProdutos()
      }
    },
    zerarVariaveis(){
      this.nome=""
      this.valor=""
      this.estoque=""
    },
  async getProdutos() {
    await Produtos.listandoProdutos().then((response) => {
        this.produtos = response.data;

        this.spinner=false
      });
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>
