import React, { useState } from 'react'
import hookApi from '../../hooks/api';
import { IDespesa } from './model';

const LandingPageView = () => {
    const [despesas, setDespesas] = React.useState<Array<IDespesa>>([]);
    const api = hookApi();

    React.useEffect(() => {
        const fetchData =async () => {
            try{
                const response = await api.get<Array<IDespesa>>('api/despesa');
                setDespesas(response.data);
            }catch(error){
                console.log('Erro ao obter despesas: ', error)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h2>LandingPageView</h2>
            <h3>Despesas</h3>
            <ul>
                <li>
                    {despesas.map(despesa => (
                        <li key={despesa.id}>
                            {despesa.despesaNome} - R$ {despesa.valor}
                        </li>
                    ))}
                </li>
            </ul>
        </div>
    )
}

export default LandingPageView