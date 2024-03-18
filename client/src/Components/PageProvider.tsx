'use client'
import { theme } from "@/app/globalStyles"
import { ThemeProvider } from "@mui/material"

export default function PageProvider({ children }: { children: JSX.Element }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}