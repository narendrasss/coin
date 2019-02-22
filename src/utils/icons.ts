import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight,
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faMinus,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

export const initIcons = () =>
  library.add(faAngleRight, faAngleDown, faArrowLeft, faArrowRight, faPlus, faMinus, faTrashAlt);
