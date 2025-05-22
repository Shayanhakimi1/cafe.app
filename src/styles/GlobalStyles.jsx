import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body, html {
    font-family: 'Vazirmatn', Tahoma, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5e5d6;
    color: #333;
    direction: rtl;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Vazirmatn', Tahoma, Arial, sans-serif;
    cursor: pointer;
  }
  
  img {
    max-width: 100%;
  }

  :root {
    --primary-color: #a97c50;
    --secondary-color: #f7a73b;
    --light-color: #f5e5d6;
    --text-color: #333;
    --light-text: #fff;
    --border-radius: 16px;
  }
`;

export default GlobalStyles;
