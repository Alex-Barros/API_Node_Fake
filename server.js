const express = require('express')
const bodyParser = require('body-parser')

//  Inicia as variaveis
const app = express()
const router = express.Router()

//  Conf do body-parser
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

//  Banco de dados
let listaAlunos = [
    {nome: "Charles", matricula: "20190250069"},
    {nome: "Alex", matricula: "20170155292"},
    {nome: "Leo", matricula: "20180250099"},
    {nome: "Rapha", matricula: "20190240060"},
    {nome: "Donatello", matricula: "20190051699"},
    {nome: "Michelangelo", matricula: "20202507488"}
]

const listaTodosAlunos = router.get( '/', (req, res) => 
    res.status(200).json( {
            ok: true,
            msg: "Lista de todos os alunos: ",
            lista: listaAlunos
        }
    )
)

const buscarPorMatricula = router.get( '/:matricula', (req, res) => {
        const matricula = req.params.matricula
        const alunoEncontrado = listaAlunos.filter( a => a.matricula == matricula)
        return res.status(200).json( {
                ok: true,
                msg: "Aluno Encontrado!",
                aluno: alunoEncontrado
            }
        )
    }
)

const matricularAluno = router.post( '/', (req, res) => {
        const alunoMatriculado = {
            nome: req.body.nome,
            matricula: req.body.matricula
        }
        
        listaAlunos.push( alunoMatriculado ) 
        
        return res.status(201).json( alunoMatriculado )
    }
)

const atualizarAlunoPorMatricula = router.put( '/:matricula', (req,res) => {
        const matricula = req.params.matricula
        const alunoAtualizado = {
            nome: req.body.nome,
            matricula: req.body.matricula
        }
        const index = listaAlunos.findIndex( a => a.matricula == matricula )
        listaAlunos[index].nome = alunoAtualizado.nome
        listaAlunos[index].matricula = alunoAtualizado.matricula

        return res.status(200).json( {
            ok: true,
            msg: "Aluno atualizado!",
            listaAtualizada: listaAlunos
        })
    }
)

const apagarAlunoPorMatricula = router.delete( '/:matricula', (req, res) => {
        const matricula = req.params.matricula
        const idxExcluir = listaAlunos.findIndex( a => a.matricula == matricula)
        const alunoExcluido = listaAlunos[idxExcluir].nome

        listaAlunos.splice( idxExcluir, 1 )

        return res.status(200).json( {
            ok: true,
            msg: `O aluno ${alunoExcluido}, foi apagado com sucesso!`,
            alunos: listaAlunos
        })
    }
)


//  Registro de todas as rotas do recurso de alunos - CRUD
app.use( '/:alunos', listaTodosAlunos )
app.use( '/:alunos', buscarPorMatricula )
app.use( '/:alunos', matricularAluno )
app.use( '/:alunos', atualizarAlunoPorMatricula )
app.use( '/:alunos', apagarAlunoPorMatricula)

const PORTA = 3000
app.listen( PORTA, _ => {
        console.log( `Express server rodando na posta ${PORTA}` )
    }
)