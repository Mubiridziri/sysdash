import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { formatFullTimeDate } from "helpers/date";

const DateTime = () => {
  const [timeDate, setTimeDate] = useState(formatFullTimeDate(new Date()));

  useEffect(() => {
    const interval = setInterval(renderTimeDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTimeDate = () => {
    setTimeDate(formatFullTimeDate(new Date()));
  };

  return (
    <Box
      component="div"
      sx={{
        width: 80,
        fontSize: 14,
        textAlign: "center",
      }}
    >
      {timeDate}
    </Box>
  );
};

export default DateTime;
