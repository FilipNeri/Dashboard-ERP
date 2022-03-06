<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <Form>
        <label>Cliente:<input type="text" v-model="cliente"/></label>
        <label
          >Produto:<select v-model="produto"
            ><option
              v-for="produto in produtos"
              :key="produto.id"
              :value="produto"
              >{{ produto.nome }} - R${{ produto.valor }}</option
            ></select
          ></label
        >
        <label
          >Quantidade:<input class="estoque" type="text" v-model="quantidade"
        /></label>
        <label>Valor Total: R$ {{ totalItemVenda }}</label>
        <div class="button">
          <Button @click.prevent="cadastrarItemVenda(produto.nome, cliente, produto.valor, quantidade, totalItemVenda)">Adicionar</Button>
        </div>
      </Form>
      <Tabela style="margin-top:10px;" :itemVendas="itemVendas" />
      <label class="valorTotal">Valor Total: R$ {{totalVenda}}</label>
      <div class="button--cadastrar">
        <Button
          @click="
            cadastrarVenda(cliente,totalVenda)
          "
          >Cadastrar</Button
        >
      </div>
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../../components/Header/Header.vue";
import Tabela from "../../components/Tabelas/TabelaVendas.vue";
import Footer from "../../components/Footer/Footer.vue";

import Vendas from "../../services/vendas";
import Produtos from "../../services/produtos";
import ItemVendas from "../../services/itemVendas";

import Swal from "sweetalert2";

import { Container, Content, Form, Button } from "./style";

export default {
  name: "Vendas",
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
      titulo: "Vendas",
      objetos: [],
      vendas: [],
      produtos: [],
      itemVendas:[],
      cliente: "",
      quantidade: "",
      produto: {
        estoque:"",
      },
    };
  },
  computed: {
    totalItemVenda() {
     var t=0
      if (
        isNaN(parseFloat(this.quantidade)) ||
        isNaN(parseFloat(this.produto.valor))
      ) {
        return 0;
      } else {
         t = (this.quantidade * this.produto.valor).toFixed(2);
        return t;
      }
    },
    totalVenda(){
      var soma=0
      this.itemVendas.forEach(venda=>{
        soma =soma +parseFloat(venda.valor_total)
      })
      soma=soma.toFixed(2)
      return soma
    }
  },
  methods: {
    async cadastrarItemVenda(produto, cliente, valor_unitario, quantidade, valor_total) {
      console.log(this.produto.estoque,quantidade)
      if(this.produto.estoque<parseInt(quantidade)){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Temos disponíveis "+this.produto.estoque+" produtos",
          confirmButtonColor: "#005bae",
        });

      }else{
      await ItemVendas.inserindoVendas({
        produto,
        cliente,
        valor_unitario,
        quantidade,
        valor_total}
      ).then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2000,
        });
        this.getItemVendas()
      });
      }
    },
    async cadastrarVenda(cliente,valor_total) {
      await Vendas.inserindoVendas({
        cliente,
        valor_total}
      ).then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2000,
        });
        this.getItemVendas()
      });
    },

    async getProdutos() {
      await Produtos.listandoProdutos().then((response) => {
        this.produtos = response.data;
        this.produtos = this.produtos.map((produto) => {
          produto.valor = parseFloat(produto.valor).toFixed(2);
        
          return produto;
        });
      });
    },
    async getVendas() {
      await Vendas.listandoVendas().then((response) => {
        this.vendas = response.data;
      });
    },
    async getItemVendas() {
      await ItemVendas.listandoVendas().then((response) => {
        this.itemVendas = response.data;
      });
    },
  },
  created() {
    this.getVendas();
    this.getProdutos();
    this.getItemVendas();
  },
};
</script>
