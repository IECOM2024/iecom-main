import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Alsans';
        src: url('/fonts/Albert_Sans/AlberSans-VariableFont-wght.ttf'), url('/fonts/Albert_Sans/AlberSans-Italic-VariableFont-wght.ttf')
      }

    `}
  />
);

export default Fonts;
