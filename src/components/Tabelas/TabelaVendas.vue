<template>
  <div style="border:solid 2px #005bae;border-radius:5px">
    <b-table
      responsive
      hover
      fixed
      bordered
      borderless
      :items="itemVendas"
      :fields="fields"
    >
      <template #cell(produto)="itemVendas">
        <b style="color:#005bae">{{ itemVendas.value }}</b>
      </template>
      <template #cell(quantidade)="itemVendas">
        <b style="color:#005bae">{{ itemVendas.value }}</b>
      </template>
      <template #cell(valor_unitario)="itemVendas">
        <b style="color:#005bae">{{ itemVendas.value }}</b>
      </template>
      <template #cell(valor_total)="itemVendas">
        <b style="color:#005bae">{{ itemVendas.value }}</b>
      </template>
      <template #cell(editar)="itemVendas">
        <button class="button" @click="abrirModal(itemVendas)">
          {{ itemVendas.value }}Editar
        </button>
      </template>
      <template #cell(remover)="itemVendas">
        <button class="button--remover" @click="removeItemVenda(itemVendas)">
          {{ itemVendas.value }}Remover
        </button>
      </template>
      <template #head(produto)="itemVendas">
        <span
          ><div class="titulo">{{ itemVendas.label }}</div></span
        >
      </template>
      <template #head(valor_unitario)="itemVendas">
        <span
          ><div class="titulo">{{ itemVendas.label }}</div></span
        >
      </template>
      <template #head(valor_total)="itemVendas">
        <span
          ><div>
            <div class="titulo">{{ itemVendas.label }}</div>
          </div></span
        >
      </template>
      <template #head(quantidade)="itemVendas">
        <span
          ><div class="titulo">{{ itemVendas.label }}</div></span
        >
      </template>
      <template #head(editar)="itemVendas">
        <span
          ><div class="titulo">{{ itemVendas.label }}</div></span
        >
      </template>
      <template #head(remover)="itemVendas">
        <span
          ><div class="titulo">{{ itemVendas.label }}</div></span
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ItemVendas from "../../services/itemVendas";

export default {
  props: {
    itemVendas: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "produto",
          label: "Produto",
          sortable: true,
        },
        {
          key: "quantidade",
          label: "Quantidade",
          sortable: true,
        },
        {
          key: "valor_unitario",
          label: "Valor Unitário",
          sortable: true,
        },
        {
          key: "valor_total",
          label: "Valor Total",
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
    abrirModal(itemVenda) {
      localStorage.setItem("itemvenda", JSON.stringify(itemVenda.item));
      this.$router.push("/editaritemvendas");
    },
    async removeItemVenda(venda) {
      await ItemVendas.removendoVendas(venda.item.id).then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      });
      this.getItemVendas();
    },
    async getItemVendas() {
      await ItemVendas.listandoVendas().then((response) => {
        this.itemVendas = response.data;
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
