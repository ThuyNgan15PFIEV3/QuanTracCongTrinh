import DataController from './data-controller';
import ExportController from './export-controller';
import LoadPageController from './loadPage-controller';
import ObjController from './obj-controller';
import WarningController from './warning-controller';
import UserController from './user-controller';


module.exports = {
    dataController: new DataController(),
    exportController: new ExportController(),
    loadPageController: new LoadPageController(),
    objController: new ObjController(),
    warningController: new WarningController(),
    userController: new UserController()
};