<template>
  <Container>
    <Header :titulo="titulo" class="titulo--routerView" />
    <Content v-if="spinner == false">
      <Grafico :chartData="vendasMes" :options="options" />
      <Grafico :chartData="vendasCliente" :options="options" />
    </Content>
    <Footer />
  </Container>
</template>

<script>
import Header from "../../components/Header/Header.vue";
import { Container, Content } from "./style";
import Footer from "../../components/Footer/Footer.vue";

import Grafico from "../../components/Grafico/Grafico.vue";
import Vendas from "../../services/vendas";

export default {
  name: "Relatorios",
  components: {
    Header,
    Container,
    Grafico,
    Content,
    Footer,
  },
  data() {
    return {
      titulo: "Relatórios",
      tituloMes: "",
      tituloCliente: "",
      options: {},
      vendasMes: {},
      vendasCliente: {},
      listagemVendas: [],
      spinner: true,
    };
  },
  computed: {},
  methods: {
    async getVendas() {
      await Vendas.listandoVendas().then((response) => {
        this.listagemVendas = response.data;
        this.listagemVendas = this.listagemVendas.map((venda) => {
          venda.created_at = venda.created_at.substr(0, 7).replace("-", "/");
          return venda;
        });
        this.getLabelsVendaMes();
        this.getDataVendaMes();
        this.getLabelsVendaClientes();
        this.getDataVendaClientes();
        this.geraGrafico();
        this.spinner = false;
      });
    },
    getLabelsVendaMes() {
      var lista = JSON.parse(JSON.stringify(this.listagemVendas));
      lista = lista.map((venda) => {
        return venda.created_at;
      });
      const listaFiltrados = lista.filter((l, i) => {
        return lista.indexOf(l) === i;
      });
      this.labelsVendaMes = listaFiltrados;
    },
    getDataVendaMes() {
      var somatorios = [];
      var lista = JSON.parse(JSON.stringify(this.listagemVendas));
      lista = lista.map((venda) => {
        return venda.created_at;
      });
      const listaFiltrados = lista.filter((l, i) => {
        return lista.indexOf(l) === i;
      })
      listaFiltrados.forEach((created_at) => {
        var soma = 0;
        this.listagemVendas.forEach((cliente) => {

          if (created_at == cliente.created_at) {
            soma = soma + parseFloat(cliente.valor_total);
          }
        });
        somatorios.push(soma);
      });
      this.dataVendaMes = somatorios;

    },
    getLabelsVendaClientes() {
      var lista = JSON.parse(JSON.stringify(this.listagemVendas));
      lista = lista.map((venda) => {

        return venda.cliente;
      });

      const listaFiltrados = lista.filter((l, i) => {
        return lista.indexOf(l) === i;
      });
      this.labelsVendaClientes = listaFiltrados;
    },
    getDataVendaClientes() {
      var somatorios = [];
      var lista = JSON.parse(JSON.stringify(this.listagemVendas));
      lista = lista.map((venda) => {
        return venda.cliente;
      });
      const listaFiltrados = lista.filter((l, i) => {
        return lista.indexOf(l) === i;
      })
      listaFiltrados.forEach((cliente) => {
        var soma = 0;
        this.listagemVendas.forEach((c) => {

          if (cliente == c.cliente) {
            soma = soma + parseFloat(c.valor_total);
          }
        });
        somatorios.push(soma);
      });
      this.dataVendaClientes = somatorios;
    },

    geraGrafico() {
      (this.vendasMes = {
        labels: this.labelsVendaMes,
        datasets: [
          {
            label: "Vendas Realizadas por Mês",
            backgroundColor: "#005bae",
            data: this.dataVendaMes,
          },
        ],
      }),
        (this.vendasCliente = {
          labels: this.labelsVendaClientes,
          datasets: [
            {
              label: "Vendas Realizadas por Cliente",
              backgroundColor: "#005bae",
              data: this.dataVendaClientes,
            },
          ],
        }),
        (this.tituloMes = "Vendas Realizadas por Mês");
      this.tituloCliente = "Vendas Realizadas por Cliente";

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
  mounted() {
    this.getVendas();
  },
};
</script>
