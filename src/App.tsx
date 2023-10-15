import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import Birthday from "./Birthday";
import Calendar from "./Calendar";

function App() {
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth={"md"} sx={{ backgroundColor: "red" }}>
                <Birthday />
            </Container>
        </ThemeProvider>
    );
}

export default App;
