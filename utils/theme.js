import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#000814',
        },
        secondary: {
            main: '#eaa21b',
        },
        text: {
            primary: '#001d3d',
        },
        background: {
            default: '#e9e9ef',
        },
        //-----------
        error: {
            main: red.A400,
        },
        divider: 'rgba(0,0,0,0.12)',
        typography: {
            htmlFontSize: 13,
            fontSize: 13,
        },
        grey: {
            '50': '#f2f6ff',
            '100': '#dce7ff',
            '200': '#c3d9ff',
            '300': '#a9c8ff',
            '400': '#8fb6ff',
            '500': '#79a5ff',
            '600': '#709aff',
            '700': '#658df4',
            '800': '#5e82e8',
            '900': '#516dd2',
        },
    },
    shape: {
        borderRadius: 12
    },
    shadows: [
        'none',
        '0px 1px 3px 0px rgba(131, 135, 153,0.2),0px 1px 1px 0px rgba(131, 135, 153,0.14),0px 2px 1px -1px rgba(131, 135, 153,0.12)',
        '0px 1px 5px 0px rgba(131, 135, 153,0.2),0px 2px 2px 0px rgba(131, 135, 153,0.14),0px 3px 1px -2px rgba(131, 135, 153,0.12)',
        '0px 1px 8px 0px rgba(131, 135, 153,0.2),0px 3px 4px 0px rgba(131, 135, 153,0.14),0px 3px 3px -2px rgba(131, 135, 153,0.12)',
        '0px 2px 4px -1px rgba(131, 135, 153,0.2),0px 4px 5px 0px rgba(131, 135, 153,0.14),0px 1px 10px 0px rgba(131, 135, 153,0.12)',
        '0px 3px 5px -1px rgba(131, 135, 153,0.2),0px 5px 8px 0px rgba(131, 135, 153,0.14),0px 1px 14px 0px rgba(131, 135, 153,0.12)',
        '0px 3px 5px -1px rgba(131, 135, 153,0.2),0px 6px 10px 0px rgba(131, 135, 153,0.14),0px 1px 18px 0px rgba(131, 135, 153,0.12)',
        '0px 4px 5px -2px rgba(131, 135, 153,0.2),0px 7px 10px 1px rgba(131, 135, 153,0.14),0px 2px 16px 1px rgba(131, 135, 153,0.12)',
        '0px 5px 5px -3px rgba(131, 135, 153,0.2),0px 8px 10px 1px rgba(131, 135, 153,0.14),0px 3px 14px 2px rgba(131, 135, 153,0.12)',
        '0px 5px 6px -3px rgba(131, 135, 153,0.2),0px 9px 12px 1px rgba(131, 135, 153,0.14),0px 3px 16px 2px rgba(131, 135, 153,0.12)',
        '0px 6px 6px -3px rgba(131, 135, 153,0.2),0px 10px 14px 1px rgba(131, 135, 153,0.14),0px 4px 18px 3px rgba(131, 135, 153,0.12)',
        '0px 6px 7px -4px rgba(131, 135, 153,0.2),0px 11px 15px 1px rgba(131, 135, 153,0.14),0px 4px 20px 3px rgba(131, 135, 153,0.12)',
        '0px 7px 8px -4px rgba(131, 135, 153,0.2),0px 12px 17px 2px rgba(131, 135, 153,0.14),0px 5px 22px 4px rgba(131, 135, 153,0.12)',
        '0px 7px 8px -4px rgba(131, 135, 153,0.2),0px 13px 19px 2px rgba(131, 135, 153,0.14),0px 5px 24px 4px rgba(131, 135, 153,0.12)',
        '0px 7px 9px -4px rgba(131, 135, 153,0.2),0px 14px 21px 2px rgba(131, 135, 153,0.14),0px 5px 26px 4px rgba(131, 135, 153,0.12)',
        '0px 8px 9px -5px rgba(131, 135, 153,0.2),0px 15px 22px 2px rgba(131, 135, 153,0.14),0px 6px 28px 5px rgba(131, 135, 153,0.12)',
        '0px 8px 10px -5px rgba(131, 135, 153,0.2),0px 16px 24px 2px rgba(131, 135, 153,0.14),0px 6px 30px 5px rgba(131, 135, 153,0.12)',
        '0px 8px 11px -5px rgba(131, 135, 153,0.2),0px 17px 26px 2px rgba(131, 135, 153,0.14),0px 6px 32px 5px rgba(131, 135, 153,0.12)',
        '0px 9px 11px -5px rgba(131, 135, 153,0.2),0px 18px 28px 2px rgba(131, 135, 153,0.14),0px 7px 34px 6px rgba(131, 135, 153,0.12)',
        '0px 9px 12px -6px rgba(131, 135, 153,0.2),0px 19px 29px 2px rgba(131, 135, 153,0.14),0px 7px 36px 6px rgba(131, 135, 153,0.12)',
        '0px 10px 13px -6px rgba(131, 135, 153,0.2),0px 20px 31px 3px rgba(131, 135, 153,0.14),0px 8px 38px 7px rgba(131, 135, 153,0.12)',
        '0px 10px 13px -6px rgba(131, 135, 153,0.2),0px 21px 33px 3px rgba(131, 135, 153,0.14),0px 8px 40px 7px rgba(131, 135, 153,0.12)',
        '0px 10px 14px -6px rgba(131, 135, 153,0.2),0px 22px 35px 3px rgba(131, 135, 153,0.14),0px 8px 42px 7px rgba(131, 135, 153,0.12)',
        '0px 11px 14px -7px rgba(131, 135, 153,0.2),0px 23px 36px 3px rgba(131, 135, 153,0.14),0px 9px 44px 8px rgba(131, 135, 153,0.12)',
        '0px 11px 15px -7px rgba(131, 135, 153,0.2),0px 24px 38px 3px rgba(131, 135, 153,0.14),0px 9px 46px 8px rgba(131, 135, 153,0.12)',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 8,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 4
                }
            }
        },
    },
});

export default theme;