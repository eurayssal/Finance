import React, { useState, useEffect } from 'react';
import hookApi from '../../hooks/api';
import { IDespesa } from './model';

const LandingPageView = () => {
    const [despesas, setDespesas] = useState<Array<IDespesa>>([]);
    const [novaDespesa, setNovaDespesa] = useState({ despesaNome: '', valor: '' });
    const [editandoDespesa, setEditandoDespesa] =  useState<IDespesa | null>(null);

    const api = hookApi();

    const getDespesas = async () => {
        try {
            const response = await api.get<Array<IDespesa>>('api/despesa');
            setDespesas(response.data);
        } catch (error) {
            console.log('Erro ao obter despesas: ', error);
        }
    };

    const postDespesa = async () => {
        try {
            await api.post('api/despesa', novaDespesa);
            setNovaDespesa({ despesaNome: '', valor: '' });
            getDespesas();
        } catch (error) {
            console.log('Erro ao adicionar despesa: ', error);
        }
    };

    const editarDespesa = async () => {
        try {
            if (editandoDespesa && editandoDespesa.id) {
                const response = await api.put<IDespesa>(`api/despesa/${editandoDespesa.id}`, novaDespesa);
                
                setDespesas((prev) => {
                    const props = prev.filter(w => w.id !== response.data.id);
                    return [...props, response.data]
                });

                setEditandoDespesa(null);
                setNovaDespesa({ despesaNome: '', valor: '' });
                getDespesas();
            }
        } catch (error) {
            console.log('Erro ao editar despesa: ', error);
        }
    };
    
    const cancelarEdicao = () => {
        setEditandoDespesa(null);
        setNovaDespesa({ despesaNome: '', valor: '' });
    };

    const excluirDespesa = async (despesa: any) => {
        try {
            await api.delete(`api/despesa/${despesa.id}`);
            getDespesas();
        } catch (error) {
            console.log('Erro ao excluir despesa: ', error);
        }
    };

    useEffect(() => {
        getDespesas();
    }, []);

    return (
        <div>
            <h2>LandingPageView</h2>
            <h3>Despesas</h3>
            <ul>
                {despesas.map((despesa) => (
                    <li key={despesa.id}>
                        {despesa.despesaNome} - R$ {despesa.valor}
                        <button onClick={() => setEditandoDespesa(despesa)}>Editar</button>
                        <button onClick={() => excluirDespesa(despesa)}>Excluir</button>
                    </li>
                ))}
            </ul>

            <h3>{editandoDespesa ? 'Editar Despesa' : 'Adicionar Nova Despesa'}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (editandoDespesa) {
                        editarDespesa();
                    } else {
                        postDespesa();
                    }
                }}
            >
                <label>
                    Nome:
                    <input
                        type="text"
                        value={novaDespesa.despesaNome}
                        onChange={(e) => setNovaDespesa({ ...novaDespesa, despesaNome: e.target.value })}
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="text"
                        value={novaDespesa.valor}
                        onChange={(e) => {
                            const valorAtualizado = e.target.value.replace(/./g, ',');
                            setNovaDespesa({ ...novaDespesa, valor: valorAtualizado })}
                        }
                    />
                </label>
                <button type="submit">{editandoDespesa ? 'Editar Despesa' : 'Adicionar Despesa'}</button>
                {editandoDespesa && <button type="button" onClick={cancelarEdicao}>Cancelar Edição</button>}
            </form>
        </div>
    );
};

export default LandingPageView;
