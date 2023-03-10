import React from "react";
import { Tooltip, SvgIcon } from "@mui/material";

import { ReactComponent as LightIcon } from "images/svg/theme/light_icon.svg";
import { ReactComponent as NightIcon } from "images/svg/theme/night_icon.svg";
import { ReactComponent as UserIcon } from "images/svg/icons/user_icon.svg";
import { ReactComponent as NotifyIcon } from "images/svg/icons/notify_icon.svg";
import { ReactComponent as SettingsIcon } from "images/svg/icons/settings_icon.svg";
import { ReactComponent as TuneIcon } from "images/svg/icons/tune_icon.svg";
import { ReactComponent as ArrowIcon } from "images/svg/icons/arrow_icon.svg";
import { ReactComponent as MoreIcon } from "images/svg/icons/more_icon.svg";
import { ReactComponent as ViewIcon } from "images/svg/icons/view_icon.svg";
import { ReactComponent as AddIcon } from "images/svg/icons/add_icon.svg";
import { ReactComponent as EditIcon } from "images/svg/icons/edit_icon.svg";
import { ReactComponent as DeleteIcon } from "images/svg/icons/delete_icon.svg";
import { ReactComponent as SettingsTableIcon } from "images/svg/icons/settings_table_icon.svg";
import { ReactComponent as TableIcon } from "images/svg/icons/table_icon.svg";
import { ReactComponent as ListIcon } from "images/svg/icons/list_icon.svg";
import { ReactComponent as ExpandMoreIcon } from "images/svg/icons/expand_more_icon.svg";
import { ReactComponent as ExpandLessIcon } from "images/svg/icons/expand_less_icon.svg";
import { ReactComponent as FilterIcon } from "images/svg/icons/filter_icon.svg";
import { ReactComponent as SearchIcon } from "images/svg/icons/search_icon.svg";
import { ReactComponent as ExportIcon } from "images/svg/icons/export_icon.svg";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const iconTypes = {
  light: LightIcon,
  dark: NightIcon,
  user: UserIcon,
  notify: NotifyIcon,
  settings: SettingsIcon,
  tune: TuneIcon,
  arrow: ArrowIcon,
  more: MoreIcon,
  view: ViewIcon,
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  settingsTable: SettingsTableIcon,
  table: TableIcon,
  list: ListIcon,
  expandMore: ExpandMoreIcon,
  expandLess: ExpandLessIcon,
  filter: FilterIcon,
  search: SearchIcon,
  export: ExportIcon,
  return: KeyboardReturnIcon,
  group: FilterNoneIcon,
  report: AssessmentOutlinedIcon,
  reports: AssessmentOutlinedIcon,
  coefficient: SignalCellularAltIcon,
  download: CloudDownloadIcon,
  message: ForwardToInboxIcon,
  checkCircle: CheckCircleIcon,
  emptyCircle: PanoramaFishEyeIcon,
  users: PeopleOutlineIcon,
  toggleActive: RadioButtonCheckedIcon,
  circle: CircleIcon,
  arrowBack: ArrowBackIcon,
  vehicle: DirectionsCarIcon,
  messageTemplates: ContactMailOutlinedIcon,
  indicators: SummarizeOutlinedIcon,
  logs: EventNoteOutlinedIcon,
  personalAccounts: AccountBoxOutlinedIcon,
  vehicles: GarageOutlinedIcon,
  rating: GradeOutlinedIcon,
  catalogs: SourceOutlinedIcon,
  staff: BadgeOutlinedIcon,
  cancel: CancelIcon,
  success: CheckCircleOutlineIcon,
  help: HelpOutlineIcon,
  copy: ContentCopyIcon,
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
};

const Icon = ({ name, title, ...props }) => {
  const icon = iconTypes[name];
  return (
    <Tooltip title={title}>
      <SvgIcon {...props} component={icon} inheritViewBox />
    </Tooltip>
  );
};

export default Icon;
