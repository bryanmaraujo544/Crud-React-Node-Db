import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
     * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          border: 0;
          background: none;
          outline: none;
          list-style: none;
          text-decoration: none;
     }

     body {
          max-width: 100vw;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
     }

`