import { createGlobalStyle } from 'styled-components/macro';
import 'normalize.css';
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: [
      'Oswald Web:200,300,400,500,600,700',
      'Open sans Web:300,400,600,700,800',
      'sans-serif',
    ],
  },
});
export const GlobalStyles = createGlobalStyle`

*,*::before,*::after {
    box-sizing:border-box;
}
    html,body {
        font-family:'Oswald',sans-serif;
        --webkit-font-smooth:antialiased;
        --moz-osx-font-smooth:grayscale;
        font-size:16px;
        background-color:#121212;
        color:#E2E2E2;
        
    }
    #root {
        height:100vh;
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
