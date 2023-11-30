/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ICartao, IConta, IDespesa, IDespesaCreateInput, IDespesaCreateViewModel } from './model';
import hookApi from '../../hooks/api';
import ButtonUi from '../../components/core/buttons/buttons';
import DisplayFlexUi from '../../components/core/display/display-flex.ui';
import InputUi from '../../components/form/inputUi';
import SiteLayout from '../_layout';
import InputMoneyUi from '../../components/core/input-money';

const dataDespesa = {
    nome: '',
    valor: '',
    data: '',
    contaCartaoId: '',
    status: true
}

const LancamentoDespesasView = () => {
    const api = hookApi();

    const [contas, setContas] = useState<Array<IConta>>([]);
    const [cartoes, setCartoes] = useState<Array<ICartao>>([]);
    const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
    const [novaDespesa, setNovaDespesa] = useState<IDespesaCreateInput>(dataDespesa);
    const [updateViewModel, setUpdateViewModel] = useState<Array<IDespesaCreateViewModel>>([])
    const [editandoDespesa, setEditandoDespesa] = useState<IDespesa | null>(null);
    const [somaDespesas, setSomaDespesas] = useState<number>(0);

    const getDespesas = async () => {
        try {
            const response = await api.get('/api/despesa');
            const despesa = response.data.map((despesa: IDespesa) => {
                return { ...despesa };
            });
            setDespesas(despesa);
        } catch (error) {
            console.error('Erro ao obter despesas: ', error);
        }
    };

    const getContas = async () => {
        try {
            const response = await api.get('/api/cadconta');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao obter contas: ', error);
        }
    };

    const getCartoes = async () => {
        try {
            const response = await api.get('/api/cadcartao')
            setCartoes(response.data);
        } catch (error) {
            console.error('Erro ao obter cartões: ', error);
        }
    }

    const cancelarEdicao = () => {
        setEditandoDespesa(null);
        setNovaDespesa(dataDespesa);
    };

    const excluirDespesa = async (despesa: IDespesa) => {
        try {
            await api.delete(`api/despesa/${despesa.id}`);
            getDespesas();
        } catch (error) {
            console.log('Erro ao excluir despesa: ', error);
        }
    };

    const getSomaDespesas = async () => {
        try {
            const response = await api.get('api/despesa/soma');
            setSomaDespesas(response.data.somaDespesas);
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    const getFormattedDate = (isoDate: string | number | Date) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        getDespesas();
        getSomaDespesas();
        getContas();
        getCartoes();
    }, []);

    const postDespesa = async () => {
        try {
            await api.post('api/despesa', novaDespesa);
            setNovaDespesa(dataDespesa);
            getDespesas();
        } catch (error) {
            console.log('Erro ao adicionar despesa: ', error);
        }
    };

    // const editarDespesa = async () => {
    //     try {
    //         if (editandoDespesa && editandoDespesa.id) {

    //             const idEdit = novaDespesa.contaCartaoId;
    //             const isCartao = cartoes.find((cartao) => cartao.id === idEdit);
    //             const isConta = cartoes.find((conta) => conta.id === idEdit);

    //             if (isCartao || isConta) {
    //                 const id = isConta ? isConta.id : isCartao?.id;

    //                 const contaEncontrada = contas.find((conta) => conta.id === id);
    //                 const cartaoEncontrado = cartoes.find((cartao) => cartao.id === id);

    //                 const nome = contaEncontrada ? contaEncontrada.nome : (cartaoEncontrado ? cartaoEncontrado.nome : '');

    //                 const payload: IDespesaCreate = {
    //                     nome: nome,
    //                     valor: novaDespesa.valor,
    //                     data: novaDespesa.data,
    //                     status: novaDespesa.status,
    //                     contaCartaoId: id || '',
    //                     };

    //                     const response = await api.put<IDespesaCreate>(
    //                         `api/despesa/${editandoDespesa.id}`,
    //                         payload
    //                     );

    //                     setUpdatedespesas((prev) => {
    //                         const updatedDespesas = prev.map((despesa) =>
    //                             despesa.contaCartaoId === editandoDespesa.id ? response.data : despesa
    //                         );
    //                         return updatedDespesas;
    //                     });
    //                 }

    //             setEditandoDespesa(null);
    //             setNovaDespesa(dataDespesa);
    //             getDespesas();

    //         }
    //     } catch (error) {
    //         console.log('Erro ao editar despesa: ', error);
    //     }
    // };

    const editarDespesa = async () => {
        try {
            if (editandoDespesa && editandoDespesa.id) {
                const idEdit = novaDespesa.contaCartaoId;
                const isCartao = cartoes.find((cartao) => cartao.id === idEdit);
                const isConta = contas.find((conta) => conta.id === idEdit);


                const id = isConta ? isConta.id : isCartao?.id;
                // const contaEncontrada = contas.find((conta) => conta.id === id);
                // const cartaoEncontrado = cartoes.find((cartao) => cartao.id === id);

                // const nome = contaEncontrada ? contaEncontrada.nome : (cartaoEncontrado ? cartaoEncontrado.nome : '');

                const payload: IDespesaCreateViewModel = {
                    nome: novaDespesa.nome,
                    valor: parseFloat(novaDespesa.valor),
                    data: novaDespesa.data,
                    status: novaDespesa.status,
                    contaCartaoId: id || '',
                };

                const response = await api.put<IDespesaCreateViewModel>(
                    `api/despesa/${editandoDespesa.id}`,
                    payload
                );

                setUpdateViewModel((prev) => {
                    const updatedDespesas = prev.map((despesa) =>
                        despesa.contaCartaoId === editandoDespesa.id ? response.data : despesa
                    );
                    return updatedDespesas;
                });

                setEditandoDespesa(null);
                setNovaDespesa(dataDespesa);
                getDespesas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    };

    useEffect(() => {


        if (editandoDespesa) {
            const isConta = editandoDespesa.contaId !== null;
            const isCartao = editandoDespesa.cartaoId !== null;

            if (isCartao || isConta) {
                const id = isConta ? editandoDespesa.contaId : editandoDespesa.cartaoId

                console.log('editandoDespesa.valor', editandoDespesa.valor)
                //O editandoDespesa.valor esta com R$

                setNovaDespesa({
                    nome: editandoDespesa.nome,
                    contaCartaoId: id,
                    data: editandoDespesa.data ? new Date(editandoDespesa.data).toISOString().split('T')[0] : '',
                    status: editandoDespesa.status,
                    valor: editandoDespesa.valor ? editandoDespesa.valor.toString() : '',
                })
            }
        }

    }, [editandoDespesa])


    useEffect(() => {
        if (despesas.length) { getSomaDespesas() }
    }, [despesas])

    const handleChangeNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovaDespesa({ ...novaDespesa, nome: e.target.value })
    }

    const handleChangeValor = (e: string) => {
        setNovaDespesa({ ...novaDespesa, valor: e })
    }

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovaDespesa({ ...novaDespesa, data: e.target.value })
    }

    const handleChangeConta = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNovaDespesa({ ...novaDespesa, contaCartaoId: e.target.value })
    }

    return (
        <SiteLayout>
            <DisplayFlexUi flexDirection='column'>
                <h2>Lançamento de despesas</h2>

                <DisplayFlexUi flexDirection='row' gap={32}>
                    <DisplayFlexUi flexDirection='column'>
                        <h3>{editandoDespesa ? 'Editar Despesa' : 'Adicionar Nova Despesa'}</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (editandoDespesa) {
                                    editarDespesa();
                                } else {
                                    postDespesa();
                                }
                            }}>
                            <DisplayFlexUi flexDirection='column' gap={16} width={300}>
                                <InputUi name='Nome' label='Nome' type="text" value={novaDespesa.nome} onChange={handleChangeNome} />
                                <InputMoneyUi name='Valor' label='Valor' value={novaDespesa.valor} onChange={handleChangeValor} />
                                <InputUi name='Data' label='Data' type="date" value={novaDespesa.data} onChange={handleChangeData} />
                                <label>Conta:
                                    <select value={novaDespesa.contaCartaoId} onChange={handleChangeConta}>
                                        <option value="">Selecione uma conta ou cartão</option>
                                        <optgroup label="Contas">
                                            {contas.filter((conta) => { return conta.atividade === true && conta.tipo === 'conta' })
                                                .map((conta: any) => (
                                                    <option key={conta.id} value={conta.id}>{conta.nome}</option>
                                                ))}
                                        </optgroup>
                                        <optgroup label='Cartões'>
                                            {cartoes.filter((cartao) => { return cartao.atividade === true && cartao.tipo === 'cartao' })
                                                .map((cartao: any) => (
                                                    <option key={cartao.id} value={cartao.id}>
                                                        {cartao.nome}
                                                    </option>))}
                                        </optgroup>
                                    </select>
                                </label>

                                <label>Status:
                                    <select value={novaDespesa.status.toString()} onChange={(e) => setNovaDespesa({ ...novaDespesa, status: e.target.value === 'true' })}>
                                        <option value='true'>Paga</option>
                                        <option value='false'>Não paga</option>
                                    </select>
                                </label>
                                <DisplayFlexUi>
                                    <ButtonUi type="submit">{editandoDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}</ButtonUi>
                                    {editandoDespesa && <ButtonUi type="button" onClick={cancelarEdicao}>Cancelar Edição</ButtonUi>}
                                </DisplayFlexUi>
                            </DisplayFlexUi>
                        </form>
                    </DisplayFlexUi>
                    <DisplayFlexUi flexDirection='column'>

                        <h3>Despesas</h3>
                        <ul>
                            {despesas.map((despesa) => (
                                <li key={despesa.id}>
                                    {despesa.nome} - R$ {despesa.valor}
                                    - Data: {getFormattedDate(despesa.data)}
                                    - Conta: {despesa.contaName ? despesa.contaName : despesa.cartaoName}
                                    - Status: {despesa.status ? 'Paga' : 'Não paga'}
                                    <DisplayFlexUi>
                                        <ButtonUi variant='secondary' onClick={() => setEditandoDespesa(despesa)}>Editar</ButtonUi>
                                        <ButtonUi variant='secondary' onClick={() => excluirDespesa(despesa)}>Excluir</ButtonUi>
                                    </DisplayFlexUi>
                                </li>
                            ))}
                        </ul>
                        <h4>Soma despesas:</h4><p>R$ {somaDespesas}</p>
                    </DisplayFlexUi>
                </DisplayFlexUi>
            </DisplayFlexUi >
        </SiteLayout>
    );
};

export default LancamentoDespesasView