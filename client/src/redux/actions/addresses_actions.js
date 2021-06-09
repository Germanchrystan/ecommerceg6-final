import axios from 'axios'
const api = 'http://apis.datos.gob.ar/georef/api'

//======================================================================//
export const getProvincias = () => async(dispatch) => {
    return await axios.get(`${api}/provincias`)
    .then((result) => result.data?.provincias)
    .then((provincias) => {
        dispatch({
            type: 'GET_PROVINCIAS',
            payload: provincias.map((p) =>{return p.nombre})
        })
    })
}
//======================================================================//
export const getMunicipios = (provincia, input) => async(dispatch) => {
    return await axios.get(`${api}/municipios?nombre=${input}&provincia=${provincia}&orden=nombre`)
    .then((result) => result.data?.municipios)
    .then((municipios) => {
        dispatch({
            type: 'GET_MUNICIPIOS',
            payload: municipios.map((m)=> {return m.nombre})
        })
    }).catch((error) => {
        dispatch({
            type: 'GET_MUNICIPIOS',
            payload: []
        })
    })
} 
//======================================================================//
export const getCalles = (provincia, municipio, input) => async(dispatch) => {
    return await axios.get(`${api}/calles?nombre=${input}&provincia=${provincia}&departamento=${municipio}&orden=nombre`)
    .then((result) => {
       return result.data?.calles ? result.data?.calles : [] })
    .then((calles) => {
        dispatch({
            type: 'GET_CALLES',
            payload: calles.length ? calles.map((c)=> {
                return {
                    nombre: c.nombre, 
                    inicioAltura:Math.min(c.altura?.inicio?.derecha, c.altura?.inicio?.izquierda),
                    finalAltura: Math.max(c.altura?.fin?.derecha, c.altura?.fin?.izquierda)
                    }
                }) : []
        })
    }).catch((error) => {
        dispatch({
            type: 'GET_CALLES',
            payload: []
        })
    }) 
}
//======================================================================//
