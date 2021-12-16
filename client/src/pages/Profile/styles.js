import styled from 'styled-components'

export const ProfileContainer = styled.main`
     background: ${props => props.theme.lightGray};
     width: 100%;
     height: 100vh;
     display: flex;
     flex-direction: column;
     align-items: center;

     .profile-grid { 
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          flex-direction: column;
          padding: 64px;
          height: auto;
          width: 100%;

          @media (max-width: 1128px){
               grid-template-columns: repeat(2, 1fr);
          }

          @media (max-width: 668px){
               grid-template-columns: 1fr;
          }

          .change-form {
               background: ${props => props.theme.primary};
               grid-column: 1 / 2;
               padding: 32px;
               border-radius: 16px;
               text-align: center;
               box-shadow: 0 6px 6px ${props => props.theme.shadow};

               .change-title {
                    margin-bottom: 24px;
                    font-weight: 900;
                    font-size: 28px;
                    color: ${props => props.theme.secondary}
               }

               .change-btn {
                    margin-top: 16px;
                    padding: 12px 24px ;
                    border-radius: 12px;
                    color: ${props => props.theme.primary};
                    background: ${props => props.theme.blue};
                    font-weight: 900;
                    cursor: pointer;
               
                    @media (max-width: 468px){
                         margin-top: 24px;
                         font-size: 16px;
                    }
               }

               .timer-div {
                    margin-top: 24px;
                    .alert-icon {
                         color: ${props => props.theme.red};
                         font-size: 32px;
                    }
                    p {
                         color: ${props => props.theme.red};
                         font-weight: 700;
                         font-size: 16px;
                    }
               }
          }
     }
`

export const Input = styled.input`
     margin: 10px 0;
     padding: 18px;
     width: 100%;
     background: ${props => props.theme.lightGray};
     border-radius: 14px;
     color: ${props => props.theme.medGray};
     font-size: 16px;
     font-weight: 900;
     outline: none;

     &:focus{
          border: 2px solid ${props => props.theme.blue};
     }

     @media (max-width: 468px){
          margin: 8px 0;
          padding: 16px;
          font-size: 16px;
     }
`