import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#6e8898',
    },
    secondary: {
      main: '#9fb1bc',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;