import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/layout/layout';
import { Error404Page } from './pages/error404-page/error404-page';
import { HomePage } from './pages/home-page/home-page';
import { ROUTES } from './shared/constants/constants';
import { InfoPage } from './pages/info-page/info-page';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.INFO} element={<InfoPage />} />
        <Route path={ROUTES.Error404Page} element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
