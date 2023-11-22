import React, { useEffect, useState } from 'react'
import hookApi from '../../hooks/api';
import { ICadCartao } from './model';
import ButtonUi from '../../components/core/buttons/buttons';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';

const CadCartaoView: React.FC = () => {
    const api = hookApi();

    var dataCartao = {
        nome: '',
        tipo: 'cartao',
        valorFatura: '0',
        diaFechamento: '',
        diaVencimento: '',
        atividade: true
    }

    const [cartoes, setCartoes] = useState<Array<ICadCartao>>([]);
    const [novoCartao, setNovoCartao] = useState(dataCartao)
    const [editandoCartao, setEditandoCartao] = useState<ICadCartao | null>(null)

    const getCartoes = async () => {
        try {
            const response = await api.get('/api/cadcartao');
            setCartoes(response.data);
        } catch (error) {
            console.error('Erro ao obter contas: ', error);
        }
    }

    useEffect(() => {
        getCartoes();
    }, [])

    const postCartao = async () => {
        try {
            await api.post('/api/cadcartao', novoCartao);
            setNovoCartao(dataCartao)
            getCartoes();
        } catch (error) {
            console.error('Erro ao adicionar conta: ', error);
        }
    }

    const editarCartao = async () => {
        try {
            if (editandoCartao && editandoCartao.id) {
                const response = await api.put<ICadCartao>(
                    `api/despesa/${editandoCartao.id}`,
                    {
                        nome: novoCartao.nome,
                        valorFatura: parseFloat(novoCartao.valorFatura),
                        diaFechamento: novoCartao.diaFechamento ? new Date(novoCartao.diaFechamento) : null,
                        diaVencimento: novoCartao.diaVencimento ? new Date(novoCartao.diaVencimento) : null,
                        atividade: novoCartao.atividade,
                    }
                )

                setCartoes((prev) => {
                    const props = prev.filter((w) => w.id !== response.data.id);
                    return [...props, response.data];
                })

                setEditandoCartao(null);
                setNovoCartao(dataCartao);
                getCartoes();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    }

    const excluirCartao = async (cartao: ICadCartao) => {
        try {
            await api.delete(`/api/cadcartao/${cartao.id}`);
            getCartoes();
        } catch (error) {
            console.error('Erro ao excluir conta: ', error);
        }
    }

    const cancelarEdicao = () => {
        setEditandoCartao(null);
        setNovoCartao(dataCartao);
    }

    useEffect(() => {
        if (editandoCartao) {
            setNovoCartao({
                nome: editandoCartao.nome || '',
                valorFatura: editandoCartao.valorFatura ? editandoCartao.valorFatura.toString() : '',
                diaFechamento: editandoCartao.diaFechamento
                    ? new Date(editandoCartao.diaFechamento).toISOString().split('T')[0]
                    : '',
                diaVencimento: editandoCartao.diaVencimento
                    ? new Date(editandoCartao.diaVencimento).toISOString().split('T')[0]
                    : '',
                atividade: editandoCartao.atividade,
                tipo: editandoCartao.tipo || '',
            })
        }
    },[])

    return (
        <div>
            <div>
            <h2>Cadastro de Cartões</h2>
            <ul>
                {cartoes
                    .map((cartao) => (
                        <li key={cartao.id}>
                            {cartao.nome} - Fatura: R$ {cartao.valorFatura} - Dia do vencimento: {cartao.diaVencimento} - Dia do fechamento: {cartao.diaFechamento}
                            <ButtonUi onClick={() => setEditandoCartao(cartao)}>Editar</ButtonUi>
                            <ButtonUi onClick={() => excluirCartao(cartao)}>Excluir</ButtonUi>
                        </li>
                    ))}
            </ul>

            <h3>{editandoCartao ? 'Editar Cartão' : 'Adicionar Novo Cartão'}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editandoCartao) {
                        editarCartao()
                    } else {
                        postCartao()
                    }
                }}>
                <label>Nome do Cartão:
                    <input
                        type="text"
                        value={novoCartao.nome}
                        onChange={(e) => setNovoCartao({ ...novoCartao, nome: e.target.value })} />
                </label>
                <label>Data de fechamento:
                    <input
                        type="date"
                        value={novoCartao.diaFechamento}
                        onChange={(e) => setNovoCartao({ ...novoCartao, diaFechamento: e.target.value })} />
                </label>
                <label>Data de vencimento:
                    <input
                        type="date"
                        value={novoCartao.diaVencimento}
                        onChange={(e) => setNovoCartao({ ...novoCartao, diaVencimento: e.target.value })} />
                </label>
                <label>Status:
                    <select
                        value={novoCartao.atividade.toString()}
                        onChange={(e) => setNovoCartao({ ...novoCartao, atividade: e.target.value === 'true' })}>
                        <option value='true'>Ativo</option>
                        <option value='false'>Inativo</option>
                    </select>
                </label>
                <DisplayFlexUi>
                    <ButtonUi type="submit">{editandoCartao ? 'Editar Cartão' : 'Adicionar Cartão'}</ButtonUi>
                    {editandoCartao && <ButtonUi type="button" onClick={cancelarEdicao}>Cancelar Edição</ButtonUi>}
                </DisplayFlexUi>
            </form>
            </div>
        </div>
    )
}

export default CadCartaoView