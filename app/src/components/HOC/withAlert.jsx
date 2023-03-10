import React from "react";
import { Alert, Snackbar } from "@mui/material";

const withAlert = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      open: false,
      severity: "success",
      message: "",
    };

    onOpenAlert = (severity, message) => {
      this.setState({ open: true, severity, message });
    };

    onClose = (event, reason) => {
      this.setState({ open: false });
    };

    render() {
      return (
        <>
          <WrappedComponent onOpenAlert={this.onOpenAlert} {...this.props} />
          <Snackbar
            open={this.state.open}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
            onClose={this.onClose}
          >
            <Alert
              onClose={this.onClose}
              severity={this.state.severity}
              sx={{ width: "100%", maxWidth: "300px" }}
            >
              {this.state.message}
            </Alert>
          </Snackbar>
        </>
      );
    }
  };
};

export default withAlert;
