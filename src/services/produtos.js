import api from './api'

export default {
    inserindoProdutos:(produto) =>{
        return api.post('/produtos',produto)
    },
    listandoProdutos:()=>{
        return api.get('/produtos')
    },
    alterandoProdutos:(produto)=>{
        return api.put('/produtos',produto)
    },
    removendoProdutos:(id)=>{
        return api.delete('/produtos/'+id)
    },
    removendoImagem:(id)=>{
        return api.delete('/produtos',id)
    }
}