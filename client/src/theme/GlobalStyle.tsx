import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
// @import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Lobster&display=swap');

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    *::-webkit-scrollbar {
      display: none;
    }
    a {
      text-decoration: none;
      color: black;
    }
    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 100%;
      padding: 0;
    }
    body{
        font-family: 'Gowun Dodum', sans-serif;
        font-family: 'Lobster', sans-serif;
        font-family: 'Noto Sans KR', sans-serif;
    }
`;

export default GlobalStyle;
