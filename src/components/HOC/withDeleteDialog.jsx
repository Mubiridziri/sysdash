import React from "react";

import DeleteDialog from "components/Dialog/DeleteDialog";

const withDeleteDialog = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      name: "этот объект",
      description: "",
      isOpen: false,
      deleteAction: null,
    };

    onCloseDeleteDialog = () => {
      this.setState({
        isOpen: false,
      });
    };

    onOpenDeleteDialog = (
      deleteAction,
      name = "этот объект",
      description = ""
    ) => {
      this.setState({
        isOpen: true,
        name,
        description,
        deleteAction,
      });
    };

    onDelete = () => {
      const { deleteAction } = this.state;

      deleteAction();
      this.onCloseDeleteDialog();
    };

    render() {
      const { isOpen, name, description } = this.state;

      return (
        <>
          <WrappedComponent
            onOpenDeleteDialog={this.onOpenDeleteDialog}
            {...this.props}
          />
          <DeleteDialog
            handleCloseOk={this.onDelete}
            handleClose={this.onCloseDeleteDialog}
            isOpen={isOpen}
            name={name}
            description={description}
          />
        </>
      );
    }
  };
};

export default withDeleteDialog;
