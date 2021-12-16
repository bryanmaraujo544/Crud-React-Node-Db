import styled, { keyframes } from 'styled-components';

export const CardContainer = styled.div`
     display: flex;
     align-items: flex-end;
     background:  ${props => props.theme.primary};
     width: 100%;
     margin: 12px 0;
     border-radius: 12px;
     padding: 24px;
     box-shadow: 0 3px 6px ${props => props.theme.shadow};

     @media (max-width: 468px){
          padding: 20px;
     }

     .text {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          height: 100%;
          margin-right: 32px;
          @media (max-width: 468px){
               margin-right: 16px;
          }
          .card-title {
               font-size: 24px;
               margin: 0;
               text-transform: capitalize;
               color: ${props => props.theme.secondary};

               @media (max-width: 468px){
                    font-size: 20px;
               }
          }
          .review-text {
               font-size: 16px;
               margin-top: 8px;
               text-align: left;
               color: ${props => props.theme.darkGray};

               @media (max-width: 468px){
                    font-size: 14px;
               }
          }
     }
     .buttons {
          display: flex;
          align-items: flex-end;
          .card-button {
               background: none;
               border: none;
               font-weight: 700;
               font-size: 14px;
               padding: 8px  16px;
               border-radius: 8px;
               cursor: pointer;
          }
          .card-button:first-child {
               color: ${props => props.theme.blue};
          }
          .card-button:last-child {
               background: ${props => props.theme.red};
               color: ${props => props.theme.primary};
               transition: .25s;
               &:hover {
                    opacity: .9;
                    transition: .25s;
               }
          }
     }
`