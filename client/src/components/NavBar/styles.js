import styled from 'styled-components';

export const NavBarContainer = styled.header`
     height: 60px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     width: 100%;
     background: ${props => props.theme.primary};
     box-shadow: 0px 3px 12px rgba(0,0,0,0.1);
     padding: 8px 64px;
     color: ${props => props.theme.secondary};

     @media (max-width: 768px){
          padding: 8px 32px;
     }
     @media (max-width: 468px){
          padding: 8px 24px;
          margin-bottom: 16px;
     }

     .backIcon {
          cursor: pointer;
          width: 42px;
          filter: invert(${props => props.isDark ? 1 : 0});
     }

     .profile {
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
               border-radius: 50%;
               height: 40px;
               width: 40px;
               margin-right: 16px;
               @media (max-width: 468px){
                    height: 32px;
                    width: 32px;
                    margin-right: 8px;
               }
          }

          p {
               font-weight: 700;
               @media (max-width: 468px){
                    font-size: 14px;
               }
          }
     }
     .logout {
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
               width: 32px;
               height: 32px;
               margin-right: 8px;
               filter: invert(${props => props.isDark ? 1 : 0});
     
               @media (max-width: 468px){
                    height: 20px;
                    width: 20px;
                    margin-right: 8px;
               }
          }
          p {
               font-weight: 700;
               text-transform: capitalize;
               @media (max-width: 468px){
                    font-size: 14px;
               }
          }
     }
`