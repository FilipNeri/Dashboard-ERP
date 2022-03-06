import Venda from '../pages/Venda/Venda.vue'
import Relatorio from '../pages/Relatorio/Relatorio.vue'
import Produto from '../pages/Produto/Produto.vue'
import EditarProdutos from '../components/Editar/EditarProdutos.vue'
import EditarVendas from '../components/Editar/EditarVendas.vue'
import EditarListaVendas from '../components/Editar/EditarListaVendas.vue'
import EditarItemVendas from '../components/Editar/EditarItemVendas.vue'
import ListagemVendas from '../pages/ListagemVendas/ListagemVendas.vue'
import VueRouter from 'vue-router'

const routes =[
    { path: '/', component: Venda},
    { path: '/editarprodutos', component: EditarProdutos},
    { path: '/editarvendas', component: EditarVendas},
    { path: '/editarlistavendas', component: EditarListaVendas},
    { path: '/editaritemvendas', component: EditarItemVendas},
    { path: '/relatorio', component: Relatorio },
    { path: '/produto', component: Produto },
    { path: '/listagemvendas', component: ListagemVendas }
]

const router = new VueRouter({
    routes 
  })
export default router