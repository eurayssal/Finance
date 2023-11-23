import styled from "@emotion/styled";

//container Pai
export const SiteLayout = styled.div(() => {
    return {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    }
})

// TopBar

export const TopBar = styled.div(() => {
    return {
        paddingLeft: '2rem',
        paddingRight: '2rem',
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-around",
        backgroundColor: '#0958D9',
    }
})



export const LeftConteiner = styled.div(() => {
    return {
        display: 'flex',
        paddingTop: '24px',
        paddingBottom: '24px',
        gap: '16px'
    }
})

export const centerContainer = styled.div(() => {
    return {

    }
})

export const rigthConteiner = styled.div(() => {
    return {

    }
})



export const Footer = styled.div(() => {
    return {
        backgroundColor: "#fff",
        textAlign: "center",
        padding: "12px",
        marginTop: "auto",
    }
})

export const LayoutContainerJss = styled.div({
    margin: '16px'
})

export const LogoImg = styled.img(() => {
    return {
        maxWidth: '150px',
        cursor: 'pointer',

    }
})
