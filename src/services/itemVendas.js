import api from './api'

export default {
    inserindoVendas:(itemVendas) =>{
        return api.post('/itemVendas',itemVendas)
    },
    listandoVendas:()=>{
        return api.get('/itemVendas')
    },
    alterandoVendas:(itemVendas)=>{
        return api.put('/itemVendas',itemVendas)
    },
    removendoVendas:(id)=>{
        return api.delete('/itemVendas/'+id)
    },
    removendoImagem:(id)=>{
        return api.delete('/itemVendas',id)
    }
}