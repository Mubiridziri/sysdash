import { Field } from "redux-form";
import Datepicker from "./Datepicker";

/**
 * Функция-преобразователь формата даты из формата компонента в формат
 * redux-form
 * @param {moment.Moment|null} value
 * @returns {string|null} В случае валидного значения вернет строку в ISO 8601 с
 * UTC+0, для пустого поля вернет null, для остальных случаев
 * (промежуточный неоконченный ввод) вернет "Invalid date"
 */
function parse(value) {
  if (value === null) return null;
  const formattedValue = value.toISOString();
  if (formattedValue === null) return "Invalid date";
  return formattedValue;
}

/**
 * Компонент-преобразователь, инкапсулирует в себе логику преобразования даты
 * для корректного представления значение в состоянии redux-form.
 * **Важно!** Значение может быть инициализировано как null для пустого поля
 * (необязательно, поведение по умолчанию), как строка даты в ISO 8601 с UTC+0
 * (пример: "2022-12-20T21:03:04.000Z"), или непосредственно как экземпляр класса
 * moment. Значение внутри поля будет отображаться по местному времени, в то
 * время как значение внутри состоянии redux-form будет null, ISO 8601 с UTC+0
 * или строка "Invalid date".
 * @param props объект параметром компонента Form из redux-form
 * @returns {JSX.Element} Datepicker
 */
export default function DatepickerField(props) {
  return (
    <Field
      {...props}
      component={Datepicker}
      parse={parse}
    />
  );
}
