import { useState, useEffect } from "react"
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

    return (
        <>

        </>
    )
}

export default Tarefas