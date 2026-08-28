import { useState, useEffect } from "react"
import '../estilo.css'
const Tarefas = () => {

    //HOOK- useState-manipula o estado da variavel
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa")
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });
    const [campo, setCampo] = useState("");

    //HOOK - useEffect -Realiza um efeito colateral, nesse caso atualiza
    //a tarefa em tempo real
    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
    }, [tarefas])

    //FUNCAO adicionar tarefa 

    const  adicionarTarefa=(e)=>{
        //previni a pagina fazer recarregamento(upload)
        e.preventDefault();
        if(!campo.trim()) return;
        //trim: espaços vazios

        const novaTarefa={
            id: Date.now(),
            text:campo,
        };
        setTarefas([...tarefas,novaTarefas]);
        setCampo();
    }

    const removerTarefa = (id) => {
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa);
    };
    return (
    <>
            <div className="todo-container">
                <h2>Minha Lista de Tarefas</h2>
                {/* chama afunção AdicionarTarefa */}
                <form onSubmit={adicionarTarefa} className="todo-form">
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="todo-input"
                    />
                    <button type="submit" className="btn-adicionar">
                        Adicionar
                    </button>
                </form>

                <ul className="todo-lista">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="todo-item">
                            <span>{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button onClick={() => removerTarefa(tarefa.id)}
                                className="btn-delete"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
                {/* compara se nao tiver mensagems deixa  Nenhuma tarefa salva */}
                {tarefas.length === 0 && <p className="mensagem">Nenhuma tarefa salva.</p>}
            </div>
            </>
    )
}

export default Tarefas