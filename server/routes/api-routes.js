'use strict';

import { dataController, exportController, objController, warningController, loadPageController } from '../controllers';

const sql = require('mssql');

module.exports = (app) => {
    app.route('/getData')
        .get(dataController.getData);
    app.route('/')
        .get(loadPageController.homepage);
    app.route('/LichSuBangBieu')
        .get(loadPageController.lichSuBangBieu);
    app.route('/BangBieu')
        .get(dataController.BangBieu);
    app.route('/Users')
        .get(loadPageController.Users);
    app.route('/BaoCao')
        .get(loadPageController.BaoCao);
    app.route('/expDocx')
        .get(exportController.expDocx);
    app.route('/map3D')
        .get(objController.map3D);
    app.route('/sendMail')
        .get(warningController.sendMail);
    app.route('/sendSMS')
        .get(warningController.sendSMS);
    app.route('/getDataOption')
        .post(dataController.getDataOption);

}