import { Box, Stack, Tooltip, Typography } from "@mui/material";
import Button from "components/Button";
import { formatFullDateTime } from "helpers/date";

export default function File({
  file: { name, startedAt },
  onDownload = () => {},
  onHide = () => {},
}) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Tooltip
        title={`${name} от ${formatFullDateTime(startedAt)}`}
        placement="left-start"
        arrow
      >
        <Typography
          variant="body2"
          sx={{
            flex: "0 0 150px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
      </Tooltip>
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1em",
        }}
      >
        <Button variant="text" onClick={onDownload}>
          Скачать
        </Button>
        <Button variant="text" onClick={onHide}>
          Скрыть
        </Button>
      </Box>
    </Stack>
  );
}
