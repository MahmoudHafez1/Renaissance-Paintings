import {LOAD_FAVLIST, CLEAR_FAVLIST} from './favActions';

const favReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_FAVLIST:
      return action.favList;

    case CLEAR_FAVLIST:
      return [];

    default:
      return state;
  }
};

export default favReducer;
