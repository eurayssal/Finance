import { useEffect, useState } from "react";
import hookApi from "../../hooks/api";

const CadContasView = () => {
    const [contas, setContas] = useState([]);
    const [novaConta, setNovaConta] = useState({ nome: '', saldo: '' });
    const [editandoConta, setEditandoConta] = useState(null);

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
            setNovaConta({ nome: '', saldo: '' });
            getContas();
        } catch (error) {
            console.error('Erro ao adicionar conta: ', error);
        }
    };

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
                        {conta.nome} - Saldo: R$ {conta.saldo}
                        <button onClick={() => excluirConta(conta)}>Excluir</button>
                    </li>
                ))}
            </ul>

            <h3>{editandoConta ? 'Editar Conta' : 'Adicionar Nova Conta'}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editandoConta) {
                        // Lógica para editar conta (semelhante ao que fizemos para despesas)
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
                <button type="submit">{editandoConta ? 'Editar Conta' : 'Adicionar Conta'}</button>
            </form>
        </div>
    );
};

export default CadContasView;