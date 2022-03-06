<template>
  <div style="border:solid 2px #005bae;border-radius:5px">
    <b-table
      responsive
      hover
      fixed
      bordered
      borderless
      :items="produtos"
      :fields="fields"
    >
      <template #cell(nome)="produto">
        <b style="color:#005bae">{{ produto.value }}</b>
      </template>
      <template #cell(valor)="produto">
        <b style="color:#005bae">{{ produto.value }}</b>
      </template>
      <template #cell(vlTotal)="produto">
        <b style="color:#005bae">{{ produto.value }}</b>
      </template>
      <template #cell(estoque)="produto">
        <b style="color:#005bae">{{ produto.value }}</b>
      </template>
      <template #cell(editar)="produto">
        <button class="button" @click="abrirModal(produto)">{{ produto.value }}Editar</button>
      </template>
      <template #cell(remover)="produto">
        <button class="button--remover" @click="removeProduto(produto)">{{ produto.value }}Remover</button>
      </template>
      <template #head(nome)="produto">
        <span class="titulo">{{ produto.label }}</span>
      </template>
      <template #head(valor)="produto">
        <span class="titulo">{{ produto.label }}</span>
      </template>
      <template #head(estoque)="produto">
        <span class="titulo">{{ produto.label }}</span>
      </template>
      <template #head(editar)="produto">
        <span class="titulo">{{ produto.label }}</span>
      </template>
      <template #head(remover)="produto">
        <span class="titulo" >{{ produto.label }}</span>
      </template>
    </b-table>
    
  </div>
</template>

<script>
import Produtos from "../../services/produtos"

import Swal from "sweetalert2";

export default {
  props: {
    produtos: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "nome",
          label: "Produto",
          sortable: true,
        },
        {
          key: "valor",
          label: "Valor",
          sortable: true,
        },
        {
          key: "estoque",
          label: "Estoque",
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
  methods:{
    abrirModal(produto){
      localStorage.setItem("produto",JSON.stringify(produto.item))
      this.$router.push("/editarprodutos");
    },
 async removeProduto(produto){

   await Produtos.removendoProdutos(produto.item.id).then(response=>{
     Swal.fire({
              position: "center",
              icon: "success",
              title: response.data.msg,
              showConfirmButton: false,
              timer: 2000,
            });
   })
   this.getProdutos()
  },
  async getProdutos() {
    await Produtos.listandoProdutos().then((response) => {
        this.produtos = response.data;

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
