<template>
  <Container>
    <Header :titulo="titulo" />
    <Content>
      <div class="button--cadastrar">
      <Button ><router-link to="/" class="button">Cadastrar Nova Venda</router-link></Button>
      </div>
      <Tabela style="margin-top:10px;" :listagemVendas="listagemVendas" />
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../../components/Header/Header.vue";
import Tabela from "../../components/Tabelas/TabelaListagemVendas.vue"
import Footer from "../../components/Footer/Footer.vue";

import Vendas from "../../services/vendas"

import { Container, Content,Button } from "./style";

export default {
  name: "ListagemVendas",
  components: {
    Header,
    Container,
    Tabela,
    Button,
    Content,
    Footer,
  },
  data() {
    return {
      titulo: "Listagem de Vendas",
      objetos: [],
      listagemVendas:[]
    };
  },
  methods: {
    async getProdutos(){
      await Vendas.listandoVendas().then(response=>{
        
        this.listagemVendas=response.data
        this.listagemVendas=this.listagemVendas.map(venda=>{
         venda.created_at= venda.created_at.substr(0,7).replace("-","/")
          return venda;
        })
      })
    }
  },
  created() {
    this.getProdutos();
  },
};
</script>
