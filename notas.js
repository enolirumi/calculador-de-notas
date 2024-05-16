import { baseServer_url } from "./variaveis.js"
import Cursos from "./cursos.js"

export const Notas = {
    setMaxima: async (data) => {
        return await axios.patch(`${baseServer_url}/notas/3`, data)
    },
    setMedia: async (data) => {
        return await axios.patch(`${baseServer_url}/notas/2`, data)
    },
    setMinima: async (data) => {
        return await axios.patch(`${baseServer_url}/notas/1`, data)
    },
    getMaxima: async () => {
        const data = await axios.get(`${baseServer_url}/notas/3`)
        return data.data
    },
    getMedia: async () => {
        const data = await axios.get(`${baseServer_url}/notas/2`)
        return data.data
    },
    getMinima: async () => {
        const data = await axios.get(`${baseServer_url}/notas/1`)
        return data.data
    },
    getAll: async (parameters = "") => {
        return await axios.get(`${baseServer_url}/notas${parameters}`)
    },
    delete: async (id) => {
        return await axios.delete(`${baseServer_url}/notas/${id}`)
    }
}

export default Cursos