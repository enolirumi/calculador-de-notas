import { Notas } from "./notas.js"
import { Cursos } from "./cursos.js"
import { cursosContainer, resultadoContainer, notaMaximaForm, notaMinimaForm, notaMediaForm, formCurso } from "./variaveis.js"



// Printa os cursos no carregamento do site 

const refreshCursos = async () => {
    const cursos = await Cursos.getAll("?_sort=id&_order=DESC");

    cursosContainer.innerHTML = ""
    cursos.forEach(async (el) => {
        cursosContainer.innerHTML += `
            <div class="cursos-item border-bottom d-flex justify-content-between p-3" data-curso-id="${el.id}" style="cursor: pointer;">
                <div>${el.nome} - ${el.universidade} - ${el.campus}</div>
                <div>
                    <button class="delete-btn btn btn-sm btn-danger" data-item-id="${el.id}">Excluir</button>
                </div>
            </div>
        `

        let allNotas = await Notas.getAll()
        allNotas = allNotas.data
        const resultados = []


        allNotas.forEach((ele) => {
            const resultado = ((parseFloat(ele.matematica) * parseFloat(el.pesoMatematica)) + (parseFloat(ele.humanas) * parseFloat(el.pesoHumanas)) + (parseFloat(ele.natureza) * parseFloat(el.pesoNatureza)) + (parseFloat(ele.linguagens) * parseFloat(el.pesoLinguagens)) + (parseFloat(ele.redacao) * parseFloat(el.pesoRedacao))) / (parseFloat(el.pesoMatematica) + parseFloat(el.pesoLinguagens) + parseFloat(el.pesoNatureza) + parseFloat(el.pesoHumanas) + parseFloat(el.pesoRedacao))
            console.log(resultados[0]);
            resultados.push(resultado.toFixed())
        })

        const elem = document.querySelector(`[data-curso-id="${el.id}"]`)

        if (el.notaDeCorte == "-") {
            elem.classList.add("bg-dark")
            elem.classList.remove("bg-success")
            elem.classList.remove("bg-danger")
            elem.classList.remove("bg-warning")
            elem.classList.remove("bg-secondary")
            elem.classList.add("text-white")
        }
        else if (resultados[0] >= el.notaDeCorte) {
            elem.classList.add("bg-success")
            elem.classList.remove("bg-danger")
            elem.classList.remove("bg-dark")
            elem.classList.remove("bg-warning")
            elem.classList.remove("bg-secondary")
            elem.classList.add("text-white")
        }
        else if (resultados[1] >= el.notaDeCorte) {
            elem.classList.add("bg-warning")
            elem.classList.remove("bg-success")
            elem.classList.remove("bg-dark")
            elem.classList.remove("bg-danger")
            elem.classList.remove("bg-secondary")
            elem.classList.add("text-white")
        }
        else if (resultados[2] >= el.notaDeCorte) {
            elem.classList.add("bg-danger")
            elem.classList.remove("bg-warning")
            elem.classList.remove("bg-dark")
            elem.classList.remove("bg-success")
            elem.classList.remove("bg-secondary")
            elem.classList.add("text-white")
        }
        else if (resultados[2] < el.notaDeCorte) {
            elem.classList.add("bg-secondary")
            elem.classList.remove("bg-danger")
            elem.classList.remove("bg-dark")
            elem.classList.remove("bg-warning")
            elem.classList.remove("bg-success")
            elem.classList.add("text-white")
        }

        elem.addEventListener("click", async (ev) => {
            const curso = await Cursos.get(ev.target.dataset.cursoId)

            let allNotas = await Notas.getAll()
            allNotas = allNotas.data
            const resultados = []

            if (el.notaDeCorte != "-") {
                allNotas.forEach((ele) => {
                    const resultado = ((parseFloat(ele.matematica) * parseFloat(curso.pesoMatematica)) + (parseFloat(ele.humanas) * parseFloat(curso.pesoHumanas)) + (parseFloat(ele.natureza) * parseFloat(curso.pesoNatureza)) + (parseFloat(ele.linguagens) * parseFloat(curso.pesoLinguagens)) + (parseFloat(ele.redacao) * parseFloat(curso.pesoRedacao))) / (parseFloat(curso.pesoMatematica) + parseFloat(curso.pesoLinguagens) + parseFloat(curso.pesoNatureza) + parseFloat(curso.pesoHumanas) + parseFloat(curso.pesoRedacao))
                    resultados.push(resultado.toFixed(1))
                })
            }

            resultadoContainer.innerHTML = `
                <div class="col-6 d-flex flex-column">
                    <div>
                        Nota mínima: <br>
                        <b>${resultados.length > 0 ? resultados[0] : "S/ nota de corte"}</b> - ${resultados[0] >= el.notaDeCorte ? "Passou" : "Não passou"}
                    </div>
                    <div>
                        Nota média: <br>
                        <b>${resultados.length > 0 ? resultados[1] : "S/ nota de corte"}</b> - ${resultados[1] >= el.notaDeCorte ? "Passou" : "Não passou"}
                    </div>
                    <div>
                        Nota máxima: <br>
                        <b>${resultados.length > 0 ? resultados[2] : "S/ nota de corte"}</b> - ${resultados[2] >= el.notaDeCorte ? "Passou" : "Não passou"}
                    </div>
                </div>
                <div class="col-6 d-flex flex-column">
                    <div>
                        Nota de corte: <br>
                        <b>${el.notaDeCorte != "-" ? el.notaDeCorte : "S/ nota de corte"}</b>
                    </div>
                </div>
            `

            formCurso.nome.value = el.nome
            formCurso.universidade.value = el.universidade
            formCurso.campus.value = el.campus
            formCurso.pesoMatematica.value = el.pesoMatematica
            formCurso.pesoLinguagens.value = el.pesoLinguagens
            formCurso.pesoHumanas.value = el.pesoHumanas
            formCurso.pesoNatureza.value = el.pesoNatureza
            formCurso.pesoRedacao.value = el.pesoRedacao
            formCurso.notaDeCorte.value = el.notaDeCorte
        })

        document.querySelector(`[data-curso-id="${el.id}"]`).querySelector(".delete-btn").addEventListener("click", (ev) => {
            const cursoId = ev.target.dataset.itemId

            Cursos.delete(cursoId)
            refreshCursos()
        })

    });
}

(async () => {


    await refreshCursos()


    const dataMinima = await Notas.getMinima()
    const dataMaxima = await Notas.getMaxima()
    const dataMedia = await Notas.getMedia()


    // Seta o valor dos inputs das notas ao carregar a pagina 

    notaMinimaForm.matematica.value = dataMinima.matematica
    notaMinimaForm.linguagens.value = dataMinima.linguagens
    notaMinimaForm.natureza.value = dataMinima.natureza
    notaMinimaForm.redacao.value = dataMinima.redacao
    notaMinimaForm.humanas.value = dataMinima.humanas

    notaMaximaForm.matematica.value = dataMaxima.matematica
    notaMaximaForm.linguagens.value = dataMaxima.linguagens
    notaMaximaForm.natureza.value = dataMaxima.natureza
    notaMaximaForm.redacao.value = dataMaxima.redacao
    notaMaximaForm.humanas.value = dataMaxima.humanas

    notaMediaForm.matematica.value = dataMedia.matematica
    notaMediaForm.linguagens.value = dataMedia.linguagens
    notaMediaForm.natureza.value = dataMedia.natureza
    notaMediaForm.redacao.value = dataMedia.redacao
    notaMediaForm.humanas.value = dataMedia.humanas


    // Envio dos formularios de nota

    notaMinimaForm.addEventListener("submit", async (ev) => {
        ev.preventDefault()
        const data = {
            matematica: ev.target.matematica.value,
            linguagens: ev.target.linguagens.value,
            humanas: ev.target.humanas.value,
            natureza: ev.target.natureza.value,
            redacao: ev.target.redacao.value,
        }

        await Notas.setMinima(data)
        await refreshCursos()
    })

    notaMediaForm.addEventListener("submit", async (ev) => {
        ev.preventDefault()
        const data = {
            matematica: ev.target.matematica.value,
            linguagens: ev.target.linguagens.value,
            humanas: ev.target.humanas.value,
            natureza: ev.target.natureza.value,
            redacao: ev.target.redacao.value,
        }

        await Notas.setMedia(data)
        await refreshCursos()
    })

    notaMaximaForm.addEventListener("submit", async (ev) => {
        ev.preventDefault()
        const data = {
            matematica: ev.target.matematica.value,
            linguagens: ev.target.linguagens.value,
            humanas: ev.target.humanas.value,
            natureza: ev.target.natureza.value,
            redacao: ev.target.redacao.value,
        }

        await Notas.setMaxima(data)
        await refreshCursos()
    })


    formCurso.addEventListener("submit", (ev) => {
        ev.preventDefault()

        const dataCurso = {
            nome: ev.target.nome.value,
            universidade: ev.target.universidade.value,
            campus: ev.target.campus.value,
            pesoMatematica: ev.target.pesoMatematica.value,
            pesoLinguagens: ev.target.pesoLinguagens.value,
            pesoHumanas: ev.target.pesoHumanas.value,
            pesoNatureza: ev.target.pesoNatureza.value,
            pesoRedacao: ev.target.pesoRedacao.value,
            notaDeCorte: ev.target.notaDeCorte.value
        }

        Cursos.set(dataCurso)

        refreshCursos()
    })


})()