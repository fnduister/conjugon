import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import Error from "../../Pages/Error/Error";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: {} as Error
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }


  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("🚀 ~ file: ErrorBoundary.tsx:23 ~ ErrorBoundary ~ componentDidCatch ~ ErrorInfo", errorInfo)
    console.log("🚀 ~ file: ErrorBoundary.tsx:23 ~ ErrorBoundary ~ componentDidCatch ~ Error", Error)
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Container sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{mt: 3, mb: 2}} variant="h3">Oops</Typography>
          {this.state.error.message && <span>{this.state.error.message}</span>}
          <Button variant="contained" sx={{width: 200, mt: 3}} color='secondary' component={Link} to="/">Retourner Acceuil</Button>
        </Container>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;