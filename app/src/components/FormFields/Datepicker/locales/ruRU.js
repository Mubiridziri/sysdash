// https://mui.com/x/react-date-pickers/localization/
import { getPickersLocalization } from "/node_modules/@mui/x-date-pickers/locales/utils/getPickersLocalization";

// This object is not Partial<PickersLocaleText> because it is the default values

const ruRUPickers = {
  // Calendar navigation
  previousMonth: "Предыдущий месяц",
  nextMonth: "Следующий месяц",

  // View navigation
  openPreviousView: "открыть предыдущее отображение",
  openNextView: "открыть следующее отображение",
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === "year"
      ? "отображение года открыто, перейти к отображению календаря"
      : "отображение календаря открыто, перейти к отображению года",
  inputModeToggleButtonAriaLabel: (isKeyboardInputOpen, viewType) =>
    isKeyboardInputOpen
      ? `текстовое поле открыто, перейти к ${viewType} отображению`
      : `${viewType} отображение открыто, перейти к текстовому полю`,

  // DateRange placeholders
  start: "Начало",
  end: "Конец",

  // Action bar
  cancelButtonLabel: "Отмена",
  clearButtonLabel: "Очистить",
  okButtonLabel: "Ок",
  todayButtonLabel: "Сегодня",

  // Toolbar titles
  datePickerToolbarTitle: "Выбрать дату",
  dateTimePickerToolbarTitle: "Выбрать дату и время",
  timePickerToolbarTitle: "Выбрать время",
  dateRangePickerToolbarTitle: "Выбрать календарный период",

  // Clock labels
  clockLabelText: (view, time, adapter) =>
    `Select ${view}. ${
      time === null
        ? "Время не выбрано"
        : `Выбрано время ${adapter.format(time, "fullTime")}`
    }`,
  hoursClockNumberText: (hours) => `${hours} часа`,
  minutesClockNumberText: (minutes) => `${minutes} минут`,
  secondsClockNumberText: (seconds) => `${seconds} секунд`,

  // Open picker labels
  openDatePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Выбрать дату, выбрана дата  ${utils.format(value, "fullDate")}`
      : "Выбрать дату",
  openTimePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Выбрать время, выбрано время  ${utils.format(value, "fullTime")}`
      : "Выбрать время",

  // Table labels
  timeTableLabel: "выбрать время",
  dateTableLabel: "выбрать дату",

  // Field section placeholders
  fieldYearPlaceholder: (params) => "Г".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) =>
    params.contentType === "letter" ? "мммм" : "мм",
  fieldDayPlaceholder: () => "дд",
  fieldHoursPlaceholder: () => "чч",
  fieldMinutesPlaceholder: () => "мм",
  fieldSecondsPlaceholder: () => "сс",
  fieldMeridiemPlaceholder: () => "мс",
};

export const ruRU = getPickersLocalization(ruRUPickers);
