import { Box, Divider, Fade, Typography } from "@mui/material";
import { LIGHT_THEME } from "constants/themes";
import FilesInProgressContainer from "components/Notifications/FilesInProgressContainer";
import FilesContainer from "components/Notifications/FilesContainer";
import { useCallback, useEffect, useRef } from "react";

export default function Notifications({ isShown, setIsShown }) {
  const componentRef = useRef(null);
  const outsideClickHandler = useCallback(
    (event) => {
      if (
        isShown &&
        !componentRef?.current.contains(event.target) &&
        event.target !== componentRef?.current
      )
        setIsShown(false);
    },
    [isShown, setIsShown]
  );

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [outsideClickHandler, setIsShown]);

  return (
    <Fade in={isShown}>
      <Box sx={styles} ref={componentRef}>
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
          }}
          className="notifications__scroll-container"
        >
          <Typography variant="body1" color="text.primary" mb="1.5em">
            Уведомления
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Уведомления отсутствуют
          </Typography>
          <Typography variant="body1" color="text.primary" m="1.5em 0">
            Состояния подготовки файлов
          </Typography>
          <FilesInProgressContainer />
          <Divider sx={{ mb: "1em" }} />
          <FilesContainer />
        </Box>
      </Box>
    </Fade>
  );
}

const styles = {
  zIndex: (theme) => theme.zIndex.appBar - 1,
  width: "400px",
  height: "calc(100vh - 60px)",
  position: "fixed",
  top: "60px",
  right: "0",
  transition: "position",
  backgroundColor: (theme) =>
    theme.palette.mode === LIGHT_THEME ? "#FFFFFF" : "#232323",
  boxShadow: (theme) =>
    `-5px 0px 5px 0px ${
      theme.palette.mode === LIGHT_THEME
        ? "rgba(125, 125, 125, 0.1)"
        : "rgba(0, 0, 0, 0.2)"
    }`,
  padding: "20px",
  overflow: "hidden",
};
