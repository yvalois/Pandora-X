import { atom, useAtom } from 'jotai';

export type DRAWER_VIEW = 'DASHBOARD_SIDEBAR' | 'DRAWER_MENU' | 'DRAWER_SEARCH';
const drawerAtom = atom({
  isOpen: false,
  view: 'DASHBOARD_SIDEBAR',
  ontipoM: '',
  searchId: '',
  filter: false,
});

export function useDrawer() {
  const [state, setState] = useAtom(drawerAtom);
  const openDrawer = (view: DRAWER_VIEW) =>
    setState({ ...state, isOpen: true, view, filter: true });

  const closeDrawer = () => setState({ ...state, isOpen: false });
  const updateTipo = (value) => setState({ ...state, ontipoM: value });
  const updateSearchId = (value) => setState({ ...state, searchId: value });

  return {
    ...state,
    openDrawer,
    closeDrawer,
    updateTipo,
    updateSearchId,
  };
}
