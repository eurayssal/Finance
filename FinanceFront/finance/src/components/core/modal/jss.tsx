import styled from "@emotion/styled";

export const DropModalJss = styled.div(() => {
    return {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.5)', /* Cor vermelha com transparência */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
  });
  

  export const ModalBoxJss = styled.div(() => {
    return {
        backgroundColor: '#00ff00', /* Cor verde */
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        position: 'relative',
    };
  });

  export const ModalHeader = styled.div(() => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
  });

  export const ModalContent = styled.div(() => {
    return {
        marginTop: '10px',

    };
  });