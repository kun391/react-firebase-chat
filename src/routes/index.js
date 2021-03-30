import routes from './routes';
import RenderRoutes from './RenderRoutes';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export { routes, RenderRoutes };
