import { fromJS, List, Map } from 'immutable';
import db from 'kilcote-utils/localstorage'
import {
  FETCH_THEME_REQUEST,
  FETCH_THEME_COMPLETE,
  TOGGLE_SIDEBAR,
  OPEN_MENU,
  OPEN_SUBMENU,
  CLOSE_ALL_SUBMENU,
  CHANGE_THEME,
  CHANGE_RANDOM_THEME,
  CHANGE_MODE,
  CHANGE_GRADIENT,
  CHANGE_DECO,
  CHANGE_BG_POSITION,
  CHANGE_LAYOUT,
  CHANGE_DIRECTION,
  LOAD_PAGE
} from 'kilcote-actions/actionConstants';

import { fetchThemeCompleteAction } from 'kilcote-actions/UiActions';

import { put, takeLatest } from "redux-saga/effects";
import * as Webapis from 'kilcote-api/theme'

const initialState = {
  /* Settings for Themes and layout */
  menuContent: db.get('USER_ROUTER') || [],
  theme: 'defaultTheme', //skyBlueTheme
  direction: db.get('THEME_DIRECTION', 'ltr'),
  type: db.get('THEME_TYPE', 'light'), // light or dark
  gradient: db.get('THEME_GRADIENT', true), // true or false
  decoration: db.get('THEME_DECORATION', true), // true or false
  bgPosition: db.get('THEME_BGPOSITION', 'half'), // half, header, full
  layout: db.get('THEME_LAYOUT', 'left-sidebar'), // big-sidebar, left-sidebar, right-sidebar, top-navigation, mega-menu
  /* End settings */
  palette: List([
    {
      name: 'Default', key: 'defaultTheme',
      themePalette: {
        primary: {
          light: '#E3F2FD',
          main: '#2196F3',
          dark: '#1565C0',
          contrastText: '#fff',
        },
        secondary: {
          light: '#E0F2F1',
          main: '#00BFA5',
          dark: '#00796B',
          contrastText: '#fff',
        }
      },
      lightPalette: {
        primary: {
          light: '#E3F2FD',
          main: '#2196F3',
          dark: '#1565C0',
          contrastText: '#fff',
        },
        secondary: {
          light: '#E0F2F1',
          main: '#00BFA5',
          dark: '#00796B',
          contrastText: '#fff',
        },
      },
      darkPalette: {
        primary: {
          light: '#E3F2FD',
          main: '#42A5F5',
          dark: '#1565C0',
          contrastText: '#fff',
        },
        secondary: {
          light: '#E0F2F1',
          main: '#00BFA5',
          dark: '#00796B',
          contrastText: '#fff',
        },
      }
    }
  ]),
  sidebarOpen: true,
  pageLoaded: false,
  isFetchedTheme: false,
  subMenuOpen: []
};

const getMenus = menuArray => menuArray.map(item => {
  if (item.get('child') != null) {
    return (item.get('child'));
  }
  return false;
});

const setNavCollapse = (menuContent, arr, curRoute) => {
  let headMenu = 'not found';
  for (let i = 0; i < arr.size; i += 1) {
    for (let j = 0; j < arr.get(i).size; j += 1) {
      if (arr.get(i).get(j).get('link') === curRoute) {
        headMenu = menuContent.get(i).get('key');
      }
    }
  }
  return headMenu;
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case FETCH_THEME_COMPLETE:
      console.log('FETCH_THEME_COMPLETE')
      return state.withMutations((mutableState) => {
        mutableState.update('palette', palette => palette.filter(x => x.key === 'defaultTheme'));
        action.theme.map(item => {
          mutableState.update('palette', palette => palette.push(item));
        });
        mutableState.set('theme', db.get('THEME_COLOR', 'defaultTheme'));
        mutableState.set('isFetchedTheme', true);
      });
    case TOGGLE_SIDEBAR:
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', !state.get('sidebarOpen'));
      });
    case OPEN_MENU:
      return state.withMutations((mutableState) => {
        mutableState.set('sidebarOpen', true);
      });
    case OPEN_SUBMENU:
      return state.withMutations((mutableState) => {
        // Set initial open parent menu
        const menuContent = state.get('menuContent');
        const activeParent = setNavCollapse(
          menuContent,
          getMenus(menuContent),
          action.initialLocation
        );

        // Once page loaded will expand the parent menu
        if (action.initialLocation) {
          mutableState.set('subMenuOpen', List([activeParent]));
          return;
        }

        // Expand / Collapse parent menu
        const menuList = state.get('subMenuOpen');
        if (menuList.indexOf(action.key) > -1) {
          if (action.keyParent) {
            mutableState.set('subMenuOpen', List([action.keyParent]));
          } else {
            mutableState.set('subMenuOpen', List([]));
          }
        } else {
          mutableState.set('subMenuOpen', List([action.key, action.keyParent]));
        }
      });
    case CLOSE_ALL_SUBMENU:
      return state.withMutations((mutableState) => {
        mutableState.set('subMenuOpen', List([]));
      });
    case CHANGE_RANDOM_THEME:
      return state.withMutations((mutableState) => {
        const paletteArray = state.get('palette').toJS();
        const random = paletteArray[Math.floor(Math.random() * paletteArray.length)];
        mutableState.set('theme', random.key);
        db.save('THEME_COLOR', random.key);
      });
    case CHANGE_THEME:
      return state.withMutations((mutableState) => {
        mutableState.set('theme', action.theme);
        db.save('THEME_COLOR', action.theme);
      });
    case CHANGE_MODE:
      return state.withMutations((mutableState) => {
        mutableState.set('type', action.mode);
        db.save('THEME_TYPE', action.mode);
      });
    case CHANGE_GRADIENT:
      return state.withMutations((mutableState) => {
        mutableState.set('gradient', action.gradient);
        db.save('THEME_GRADIENT', action.gradient);
      });
    case CHANGE_DECO:
      return state.withMutations((mutableState) => {
        mutableState.set('decoration', action.deco);
        db.save('THEME_DECORATION', action.deco);
      });
    case CHANGE_BG_POSITION:
      return state.withMutations((mutableState) => {
        mutableState.set('bgPosition', action.position);
        db.save('THEME_BGPOSITION', action.position);
      });
    case CHANGE_LAYOUT:
      return state.withMutations((mutableState) => {
        mutableState.set('layout', action.layout);
        db.save('THEME_LAYOUT', action.layout);
      });
    case CHANGE_DIRECTION:
      return state.withMutations((mutableState) => {
        mutableState.set('direction', action.direction);
        db.save('THEME_DIRECTION', action.direction);
      });
    case LOAD_PAGE:
      return state.withMutations((mutableState) => {
        mutableState.set('pageLoaded', action.isLoaded);
      });
    default:
      return state;
  }
}

export function* sagaCrudUI() {
  yield takeLatest(`${FETCH_THEME_REQUEST}`, function* themeFetchInit(action) {
    try {
      const { data: themeDatas } = yield Webapis.getTotalThemes();
      yield put(fetchThemeCompleteAction(List(themeDatas.theme)));
    } catch (e) {
      console.error(e)
      yield put(fetchThemeCompleteAction(List([])));
    }
  });
}
