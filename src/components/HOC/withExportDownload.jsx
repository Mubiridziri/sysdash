import React, { useContext, useEffect, useState } from "react";
import { Fade, Snackbar } from "@mui/material";
import NotificationsContext from "contexts/NotificationsContext";
import { useSelector } from "react-redux";
import { getFilterParams } from "helpers/requestParams";

const defaultMessage = "Начато формирование файла на сервере";

const withExportDownload = (WrappedComponent) => {
  return function (props) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(defaultMessage);
    const [timeoutId, setTimeoutId] = useState(null);
    const { setNotificationsIsShown } = useContext(NotificationsContext);
    const { filterParams } = useSelector((state) => state.requestParams);

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [open, setNotificationsIsShown, timeoutId]);

    const onOpen = async (event, customUrl) => {
      if (!open) {
        const url = customUrl
          ? customUrl
          : `${props.url}/export?${new URLSearchParams(
              getFilterParams(filterParams)
            )}`;
        const response = await fetch(url, {
          method: "post",
        });
        if (response.ok) setNotificationsIsShown(true);
        else setMessage("При запросе на формирование файла произошла ошибка");
        setOpen(true);

        setTimeoutId(
          setTimeout(() => {
            setOpen(false);
            setMessage(defaultMessage);
          }, 3000)
        );
      }
    };

    return (
      <>
        <WrappedComponent onOpenExportDownload={onOpen} {...props} />
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          message={message}
          TransitionComponent={Fade}
        />
      </>
    );
  };
};

export default withExportDownload;
