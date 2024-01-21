import { useEffect, useState } from "react";
import hookApi from "../../hooks/api";
import { ICadConta, IContaCreate } from "./model";
import ButtonUi from "../../components/core/buttons/buttons";
import { useNavigate } from "react-router-dom";
import InputUi from "../../components/form/inputUi";
import SiteLayout from "../_layout";
import InputMoneyUi from "../../components/core/input-money";
import DisplayFlexUi from "../../components/core/display/display-flex.ui";
import { maskMoney } from "../../utils/mold/money.mold";

const dataConta = {
    nome: '',
    tipo: 'conta',
    saldo: '',
    atividade: true,
}
const CadContasView = () => {
    const api = hookApi();

    const [contas, setContas] = useState<Array<ICadConta>>([]);
    const [novaConta, setNovaConta] = useState<IContaCreate>(dataConta);
    const [editandoConta, setEditandoConta] = useState<ICadConta | null>(null);

    const getContas = async () => {
        try {
            const response = await api.get('/api/cadconta');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao obter contas: ', error);
        }
    };
    useEffect(() => {
        getContas();
    }, []);

    const postConta = async () => {
        try {
            await api.post('/api/cadconta', novaConta);
            setNovaConta(dataConta);
            getContas();
        } catch (error) {
            console.error('Erro ao adicionar conta: ', error);
        }
    };

    const editarConta = async () => {
        try {
            if (editandoConta && editandoConta.id) {
                const response = await api.put<ICadConta>(
                    `api/cadconta/${editandoConta.id}`,
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
                setNovaConta(dataConta);
                getContas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    }

    useEffect(() => {
        if (editandoConta) {
            setNovaConta({
                nome: editandoConta.nome || '',
                saldo: editandoConta.saldo ? editandoConta.saldo.toString() : '',
                atividade: editandoConta.atividade,
                tipo: editandoConta.tipo
            })
        }
    }, [editandoConta])

    const cancelarEdicao = () => {
        setEditandoConta(null);
        setNovaConta(dataConta);
    }

    const excluirConta = async (conta: ICadConta) => {
        try {
            await api.delete(`/api/cadconta/${conta.id}`);
            getContas();
        } catch (error) {
            console.error('Erro ao excluir conta: ', error);
        }
    };

    const handleChangeNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovaConta({ ...novaConta, nome: e.target.value })
    }

    const handleChangeSaldo = (valor: string) => {
        setNovaConta({ ...novaConta, saldo: valor })
    }
    return (
        <SiteLayout>
            <DisplayFlexUi flexDirection="column">
                <h2>Cadastro de Contas</h2>
                <DisplayFlexUi flexDirection='row' gap={32}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editandoConta) {
                                editarConta()
                            } else {
                                postConta();
                            }
                        }}>
                        <h3>{editandoConta ? 'Editar Conta' : 'Adicionar Nova Conta'}</h3>
                        <DisplayFlexUi flexDirection="column" gap={16}>

                            <InputUi name="Nome da conta" label="Nome da conta" type="text" value={novaConta.nome} onChange={handleChangeNome} />
                            <InputMoneyUi name="Saldo" label="Saldo" value={novaConta.saldo} onChange={handleChangeSaldo} />
                            <label>
                                Status:
                                <select
                                    value={novaConta.atividade.toString()}
                                    onChange={(e) => setNovaConta({ ...novaConta, atividade: e.target.value === 'true' })}>
                                    <option value='true'>Ativo</option>
                                    <option value='false'>Inativo</option>
                                </select>
                            </label>
                            <DisplayFlexUi>
                                <ButtonUi type="submit">{editandoConta ? 'Editar Despesa' : 'Adicionar Despesa'}</ButtonUi>
                                {editandoConta && <ButtonUi type="button" onClick={cancelarEdicao}>Cancelar Edição</ButtonUi>}
                            </DisplayFlexUi>
                        </DisplayFlexUi>
                    </form>

                    <DisplayFlexUi flexDirection="column">
                        <ul>
                            {contas.map((conta) => (
                                    <li key={conta.id}>
                                        {conta.nome} - Saldo: R$ {maskMoney(conta.saldo)} - Status: {conta.atividade ? 'Ativa' : 'Inativa'}
                                        <ButtonUi onClick={() => setEditandoConta(conta)}>Editar</ButtonUi>
                                        <ButtonUi onClick={() => excluirConta(conta)}>Excluir</ButtonUi>
                                    </li>
                                ))}
                        </ul>
                    </DisplayFlexUi>
                </DisplayFlexUi>
            </DisplayFlexUi>
        </SiteLayout>
    );
};

export default CadContasView;