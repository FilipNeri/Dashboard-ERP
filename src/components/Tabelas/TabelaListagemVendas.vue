<template>
  <div style="border:solid 2px #005bae;border-radius:5px">
    <b-table
      responsive
      hover
      fixed
      bordered
      borderless
      :items="listagemVendas"
      :fields="fields"
    >
      <template #cell(cliente)="listagemVenda">
        <b style="color:#005bae">{{ listagemVenda.value }}</b>
      </template>
      <template #cell(created_at)="listagemVenda">
        <b style="color:#005bae">{{ listagemVenda.value }}</b>
      </template>
      <template #cell(valor_total)="listagemVenda">
        <b style="color:#005bae">{{ listagemVenda.value }}</b>
      </template>
      <template #cell(editar)="listagemVenda">
        <button class="button" @click="abrirModal(listagemVenda)">
          {{ listagemVenda.value }}Editar
        </button>
      </template>
      <template #cell(remover)="listagemVenda">
        <button class="button--remover" @click="removeVenda(listagemVenda)">
          {{ listagemVenda.value }}Remover
        </button>
      </template>
      <template #head(cliente)="listagemVenda">
        <span class="titulo">{{ listagemVenda.label }}</span>
      </template>
      <template #head(created_at)="listagemVenda">
        <span class="titulo">{{ listagemVenda.label }}</span>
      </template>
      <template #head(valor_total)="listagemVenda">
        <span class="titulo">{{ listagemVenda.label }}</span>
      </template>
      <template #head(editar)="listagemVenda">
        <span class="titulo">{{ listagemVenda.label }}</span>
      </template>
      <template #head(remover)="listagemVenda">
        <span class="titulo">{{ listagemVenda.label }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vendas from "../../services/vendas";

import Swal from "sweetalert2";

export default {
  props: {
    listagemVendas: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "cliente",
          label: "Cliente",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Data da Venda",
          sortable: true,
        },
        {
          key: "valor_total",
          label: "Valor Total do Pedido",
          sortable: true,
        },
        {
          key: "editar",
          label: "Editar",
          sortable: true,
        },
        {
          key: "remover",
          label: "Remover",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    abrirModal(listagemVenda) {
      localStorage.setItem("listavendas", JSON.stringify(listagemVenda.item));
      this.$router.push("/editarlistavendas");
    },
    async removeVenda(venda) {
      await Vendas.removendoVendas(venda.item.id).then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      });
      this.getVendas();
    },
    async getVendas() {
      await Vendas.listandoVendas().then((response) => {
        this.listagemVendas = response.data;
        this.listagemVendas = this.listagemVendas.map((venda) => {
          venda.created_at = venda.created_at.substr(0, 7).replace("-", "/");
          return venda;
        });
      });
    },
  },
  mounted() {
    const elements = document.getElementsByClassName("sr-only");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  },
};
</script>
<style scoped>
.titulo {
  display: flex;
  justify-content: center;
  align-content: center;

  color: #fff;
  background-color: #005bae;
  border-radius: 20px;
  padding: 3px;
  font-size: 22px;
}
.button {
  background-color: #6c757d;
  font-size: 16px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  color: white;
}
.button--remover {
  background-color: #df4759;
  font-size: 16px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  color: white;
}
.button:hover {
  transition: all 0.5s ease;
  filter: brightness(85%);
}
.button--remover:hover {
  transition: all 0.5s ease;
  filter: brightness(85%);
}
</style>
