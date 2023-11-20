import { useEffect, useState } from "react";
import hookApi from "../../hooks/api";
import { ICadConta } from "./model";

const CadContasView = () => {
    const [contas, setContas] = useState<Array<ICadConta>>([]);
    const [novaConta, setNovaConta] = useState({ nome: '', saldo: '', atividade: true });
    const [editandoConta, setEditandoConta] = useState<ICadConta | null>(null);

    const api = hookApi();

    const getContas = async () => {
        try {
            const response = await api.get('/api/cadconta');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao obter contas: ', error);
        }
    };

    const postConta = async () => {
        try {
            await api.post('/api/cadconta', novaConta);
            setNovaConta({ nome: '', saldo: '', atividade: true  });
            getContas();
        } catch (error) {
            console.error('Erro ao adicionar conta: ', error);
        }
    };

    const editarConta = async () => {
        try {
            if(editandoConta && editandoConta.id){
                const response = await api.put<ICadConta>(
                    `api/despesa/${editandoConta.id}`,
                    {
                        nome: novaConta.nome,
                        saldo: parseFloat(novaConta.saldo),
                        atividade: novaConta.atividade
                    }
                )

                setContas((prev) => {
                    const props = prev.filter((w) => w.id !== response.data.id);
                    return [...props, response.data];
                });

                setEditandoConta(null);
                setNovaConta({ nome: '', saldo: '', atividade: true });
                getContas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    }

    const excluirConta = async (conta: any) => {
        try {
            await api.delete(`/api/cadconta/${conta.id}`);
            getContas();
        } catch (error) {
            console.error('Erro ao excluir conta: ', error);
        }
    };

    useEffect(() => {
        getContas();
    }, []);

    return (
        <div>
            <h2>Cadastro de Contas</h2>
            <ul>
                {contas.map((conta: any) => (
                    <li key={conta.id}>
                        {conta.nome} - Saldo: R$ {conta.saldo} - Status: {conta.atividade}
                        <button onClick={() => excluirConta(conta)}>Excluir</button>
                    </li>
                ))}
            </ul>

            <h3>{editandoConta ? 'Editar Conta' : 'Adicionar Nova Conta'}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editandoConta) {
                        editarConta()
                    } else {
                        postConta();
                    }
                }}
            >
                <label>
                    Nome da Conta:
                    <input
                        type="text"
                        value={novaConta.nome}
                        onChange={(e) => setNovaConta({ ...novaConta, nome: e.target.value })}
                    />
                </label>
                <label>
                    Saldo:
                    <input
                        type="text"
                        value={novaConta.saldo}
                        onChange={(e) => setNovaConta({ ...novaConta, saldo: e.target.value })}
                    />
                </label>
                <label>
        Status:
        <select 
            value={novaConta.atividade.toString()}
            onChange={(e) => setNovaConta({ ...novaConta, atividade: e.target.value === 'true' })}>
            <option value='true'>Ativo</option>
            <option value='false'>Inativo</option>
        </select>
    </label>
                <button type="submit">{editandoConta ? 'Editar Conta' : 'Adicionar Conta'}</button>
            </form>
        </div>
    );
};

export default CadContasView;