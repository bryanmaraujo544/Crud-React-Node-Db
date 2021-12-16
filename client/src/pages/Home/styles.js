import styled from 'styled-components'

export const HomeContainer = styled.div`
     background: ${props => props.theme.lightGray};
     min-height: 102vh;

     .main {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;

          @media (max-width: 468px){
          padding: 0px 24px;
          }
     
     }
     
     h1 {
          margin-top: 8px;
          text-transform: capitalize;
          font-weight: 900;
          font-size: 48px;
          color:  ${props => props.theme.secondary};
          text-align: center;
     
          @media(max-width: 578px){
               font-size: 36px;
               margin-top: 16px;
          }
     }
     
     .reviews {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 48px 0 48px 0;
     }
`

