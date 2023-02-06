import { required } from "helpers/formValidators";
import { formatFullDateTime } from "helpers/date";

export const EXTERNAL_SYSTEMS_COLUMNS = [
  { id: "title", label: "Наименование" },
  { id: "description", label: "Описание" },
  { id: "token", label: "Токен авторизации" },
  { id: "createdAt", label: "Дата создания", format: formatFullDateTime },
];

export const MESSAGES_COLUMNS = {
  logs: [
    { id: "createdAt", label: "Дата", format: formatFullDateTime },
    { id: "message", label: "Сообщение" },
    { id: "type", label: "Тип" },
  ],
  metrics: [
    { id: "createdAt", label: "Дата", format: formatFullDateTime },
    { id: "name", label: "Наименование" },
    { id: "type", label: "Тип" },
    { id: "value", label: "Значение" },
    {
      id: "extra",
      label: "Дополнительно",
      format: (value) => JSON.stringify(value),
    },
  ],
};

export const CLASSIFIER_DATA_COLUMNS = [
  { id: "code", label: "Код", validate: required },
  { id: "value", label: "Значение", validate: required },
];
