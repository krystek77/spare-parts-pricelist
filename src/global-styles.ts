import { createGlobalStyle } from 'styled-components/macro';
import 'normalize.css';

export const GlobalStyles = createGlobalStyle`

*,*::before,*::after {
    box-sizing:border-box;
}
    html {
        font-family:'Oswald',sans-serif;
        font-size:16px;
        background-color:#191919;
        color:#E2E2E2;
        
    }
    h1,h2,h3,h4,h5,h6 {
         font-family:'Open Sans',sans-serif;
         line-height:1.3;
         font-weight:normal;
         margin:0;
         
    }
    p {
        font-family:'Oswald',sans-serif;
        line-height:1.3;
        font-weight:300;
        margin:0;
    }
`;
