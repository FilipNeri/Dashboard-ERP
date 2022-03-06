import api from './api'

export default {
    inserindoVendas:(vendas) =>{
        return api.post('/vendas',vendas)
    },
    listandoVendas:()=>{
        return api.get('/vendas')
    },
    alterandoVendas:(vendas)=>{
        return api.put('/vendas',vendas)
    },
    removendoVendas:(id)=>{
        return api.delete('/vendas/'+id)
    },
    removendoImagem:(id)=>{
        return api.delete('/vendas',id)
    }
}