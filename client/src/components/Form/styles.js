import styled from 'styled-components';

export const FormContainer = styled.form`
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin-top: 36px;
     
     @media (max-width: 468px){
          margin-top: 32px;
     }
     
     label {
          font-size:16px;
          font-weight: 500;
     }

     .input-div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
     }
     
     input {
          padding: 20px;
          width: 400px;
          border: none;
          margin-bottom: 24px;
          font-size: 18px;
          border-radius: 8px;
          color:  ${props => props.theme.darkGray};
          background:  ${props => props.theme.primary};
          @media(max-width: 578px){
          width: 100%;
          padding: 16px;
          }
     }
     
     button {
          background:  ${props => props.theme.blue};
          border: none;
          color:  ${props => props.theme.primary};
          padding: 12px;
          width: 150px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          margin-top: 8px;
          cursor: pointer;
          outline-color:  ${props => props.theme.blue};
     }
`