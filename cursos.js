import { baseServer_url } from "./variaveis.js"


export const Cursos = {
    set: async (data) => {
        const dataCursos = await axios.post(`${baseServer_url}/cursos`, data)
        return dataCursos.data
    },
    getAll: async () => {
        const dataCursos = await axios.get(`${baseServer_url}/cursos`)
        return dataCursos.data
    },
    get: async (id) => {
        const dataCursos = await axios.get(`${baseServer_url}/cursos/${id}`)
        return dataCursos.data
    },
    delete: async (id) => {
        return await axios.delete(`${baseServer_url}/cursos/${id}`)
    }
}

export default Cursos