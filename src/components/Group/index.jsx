import * as React from "react";
import { useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Popover, Box, Typography, Badge } from "@mui/material";

import { resetParams, setGroup } from "actions/requestParams";

import Icon from "components/Icon";
import Button from "components/Button";
import LoadingButton from "components/LoagingButton";

import Select from "components/FormFields/Select";
import IconButton from "components/IconButton";
import { loadGroupData } from "actions/group";
import { DARK_MAIN_COLOR } from "themes";

let GroupPopover = ({
  columns,
  handleSubmit,
  submitting,
  loadData,
  pristine,
  reset,
  url,
  isGroup,
  setIsGroup,
}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(null);

  const id = Boolean(open) ? "group-popover" : undefined;

  const onOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const onClose = () => {
    setOpen(null);
  };

  const submit = (values) => {
    const value = values["group"];
    const fieldName = value?.id ?? value;
    dispatch(
      loadGroupData({
        url,
        fieldName,
        page: 1,
        limit: 10,
      })
    );
    dispatch(resetParams());
    dispatch(setGroup({ fieldName }));
    setIsGroup(true);
  };

  const onReset = () => {
    reset();
    if (isGroup) {
      dispatch(
        loadData({
          page: 1,
          limit: 10,
        })
      );
      dispatch(resetParams());
      setIsGroup(false);
    }
  };

  const disabledResetButton = () => {
    if (isGroup) {
      return false;
    }
    return pristine;
  };

  return (
    <>
      <Badge
        variant={isGroup ? "dot" : ""}
        sx={{
          "& .MuiBadge-badge": {
            right: 7,
            top: 6,
            backgroundColor: DARK_MAIN_COLOR,
          },
        }}
      >
        <IconButton
          name="group"
          title="Группировка"
          color="secondary"
          size="small"
          onClick={onOpen}
        />
      </Badge>
      <Popover
        id={id}
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: 300,
            padding: "5px 10px 10px 10px",
            overflow: "visible",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "5px",
          }}
        >
          <Typography>Группировка</Typography>
          <Button onClick={onReset} disabled={disabledResetButton()}>
            Сбросить
          </Button>
        </Box>
        <form onSubmit={handleSubmit(submit)}>
          <Box
            component="div"
            sx={{
              padding: "7px",
            }}
          >
            <Field
              id={id}
              component={Select}
              name="group"
              label="Группировать по"
              fullWidth
              icon={
                <Icon
                  name="search"
                  color="action"
                  fontSize="small"
                  sx={{ width: 14, height: 14 }}
                />
              }
              options={columns}
              size="small"
              sx={{ mb: "0 !important" }}
            />
          </Box>
          <Box component="div" sx={{ pt: "10px" }}>
            <LoadingButton
              disabled={pristine}
              loading={submitting}
              variant="contained"
              type="submit"
              color="primary"
              size="small"
            >
              Применить
            </LoadingButton>
          </Box>
        </form>
      </Popover>
    </>
  );
};

export default reduxForm({
  form: "group-form",
  onSubmit: () => {},
})(GroupPopover);
