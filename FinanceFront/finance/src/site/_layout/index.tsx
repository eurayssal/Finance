import React, { PropsWithChildren } from "react";
import * as jss from "./jss";
import Logo from '../../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import ButtonUi from "../../components/core/buttons/buttons";

const SiteLayout: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const navigate = useNavigate();
    const toLandingPage = () => navigate('/landing-page')
    const toLancamentoDespesas = () => navigate('/lancamento-despesas')
    const toLancamentoReceitas = () => navigate('/lancamento-receitas')
    const toCadContas = () => navigate('/cadastro-contas')
    const toCadCartoes = () => navigate('/cadastro-cartoes')


    return (
        <jss.SiteLayout>

            <jss.TopBar>
                <jss.rigthConteiner>
                    <jss.LogoImg onClick={toLandingPage} src={Logo} />
                </jss.rigthConteiner>
                <jss.LeftConteiner>
                    <ButtonUi onClick={toLancamentoDespesas} variant="borderWhite">Despesas</ButtonUi>
                    <ButtonUi onClick={toLancamentoReceitas} variant="white">Receitas</ButtonUi>
                    <ButtonUi onClick={toCadContas} variant="white">Contas</ButtonUi>
                    <ButtonUi onClick={toCadCartoes} variant="white">Cartões</ButtonUi>
                </jss.LeftConteiner>
            </jss.TopBar>

            <jss.LayoutContainerJss>
                {children}
            </jss.LayoutContainerJss>

            <jss.Footer>© Finance Club</jss.Footer>
        </jss.SiteLayout>
    )
}

export default SiteLayout;
