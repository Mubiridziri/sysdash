import moment from "moment";
import "moment/locale/ru";

export const momentFormat = (value = new Date()) =>
  moment(value, "DD-MM-YYYY HH:mm");

export const formatDate = (value) => {
  if (value) return momentFormat(value).format("DD.MM.YYYY");
};

export const formatDateTime = (value) => {
  if (value) return momentFormat(value).format("DD.MM.YYYY HH:mm");
};

export const formatFullTimeDate = (value) => {
  if (value) return momentFormat(new Date(value)).format("HH:mm:ss DD.MM.YYYY");
};

export const formatFullDateTime = (value) => {
  if (value) return momentFormat(new Date(value)).format("DD.MM.YYYY HH:mm:ss");
};

export const formatTime = (value) => {
  if (value) return momentFormat(new Date(value)).format("HH:mm");
};
