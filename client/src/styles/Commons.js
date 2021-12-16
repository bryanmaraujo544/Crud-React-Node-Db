import styled from 'styled-components'

export const AuthContainer = styled.main`
     background-color: ${props => props.theme.primary};
     height: 100vh;
     max-width: 100vw;
     display: flex;
     padding: 0;
     justify-content: center;
     
     
     @media (max-width: 468px){
          padding: 24px;
          padding-top: 48px;
     }

     .box {
          margin-top: 32px;
          text-align: center;
          @media (max-width: 468px){
               margin-top: 0px;
          }
          h1 {
               margin-top: 0px;
               text-transform: capitalize;
               font-weight: 900;
               font-size: 48px;
               color: ${props => props.theme.secondary};
               text-align: center;
          
               @media(max-width: 578px){
                    font-size: 36px;
                    margin-top: 16px;
               }
          }

          input {
               padding: 20px;
               width: 400px;
               border: none;
               margin-bottom: 24px;
               font-size: 18px;
               border-radius: 8px;
               color: ${props => props.theme.darkGray};
               background: white;
          
               @media(max-width: 578px){
                    width: 100%;
                    padding: 16px;
               }
          }

          .subtitle {
               color: ${props => props.theme.darkGray};
               font-size: 18px;
               a {
                    color: ${props => props.theme.blue};
               }
          }
     }

     .form {
          margin: 32px 0 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          @media (max-width: 468px){
               margin-top: 32px;
          }
          input {
               margin: 12px 0;
               background: ${props => props.theme.lightGray};
               border-radius: 16px;
               color: ${props => props.theme.darkGray};

               @media (max-width: 468px){
                    margin: 8px 0;
                    padding: 16px;
                    font-size: 16px;
               }
          }

          button {
               margin-top: 32px;
               border-radius: 14px;
               width: 100%;
               background: #0070F3;
               border: none;
               color: #fff;
               padding: 12px;
               font-size: 16px;
               font-weight: 700;
               cursor: pointer;
               outline-color: #0070F3;
          
               @media (max-width: 468px){
                    margin-top: 24px;
                    font-size: 16px;
               }
          }
     }
`

