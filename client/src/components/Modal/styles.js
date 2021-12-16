import styled from 'styled-components';

export const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.modalBg};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding:  0 64px;

    @media( max-width: 768px){
        padding: 0 32px;
    }
    

    .card {
        background: ${props => props.theme.primary};
        width: 100%;
        max-width: 700px;
        display: flex;
        align-items: flex-end;
        padding: 32px;
        border-radius: 16px;
        position: relative;

        .close-icon {
            position: absolute;
            top: -32px;
            right: -32px;
            color: ${props => props.theme.primary};
            cursor: pointer;
            
            @media( max-width: 768px){
                top: -32px;
                right: -16px;
            }
        }
    
        .text {
            flex-grow: 1;
            margin-right: 48px;

            @media(max-width: 768px){
                margin-right: 24px;
            }
            .card-title {
                font-size: 32px;
                margin: 0;
                margin-bottom: 16px;
                color: ${props => props.theme.secondary};
            }
    
            .review-input {
                padding: 16px;
                width: 100%;
                border: none;
                margin-top: 12px;
                margin-bottom: 24px;
                font-size: 18px;
                border-radius: 8px;
                color: ${props => props.theme.medGray};
                background: ${props => props.theme.lightGray};
                margin: 0;
            }
        }
  
        .buttons {
            margin-top: 24px;
            button {
                background: ${props => props.theme.blue};
                color: ${props => props.theme.primary};
                padding: 10px 24px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: .25s;
    
                &:hover {
                    background: ${props => props.theme.blue};
                }
            }
        }
    }
`