'use client';

import { Dashboard } from "@/components/Dashboard.component";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    background: {
      default: "#0f0f23",
      paper: "#1a1a2e",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    grey: {
      50: "#f8fafc",
      100: "#334155",
      200: "#475569",
      300: "#64748b",
      400: "#94a3b8",
      500: "#cbd5e1",
      600: "#e2e8f0",
      700: "#f1f5f9",
      800: "#f8fafc",
      900: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)",
    "0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "0px 10px 15px -3px rgba(0, 0, 0, 0.3), 0px 4px 6px -2px rgba(0, 0, 0, 0.2)",
    "0px 20px 25px -5px rgba(0, 0, 0, 0.4), 0px 10px 10px -5px rgba(0, 0, 0, 0.2)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.15)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
        },
      },
    },
  },
});

export default function Home() {

  return (
    <ThemeProvider theme={theme}>
      <Dashboard/>
    </ThemeProvider>
  );
}
