import { HttpApplication } from './applications/HttpApplication/HttpApplication';
import { Configuration } from './configuration';

const App = new HttpApplication(Configuration);

App.listen();