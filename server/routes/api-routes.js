'use strict';

import { dataController, exportController, objController, warningController, loadPageController, userController } from '../controllers';

const sql = require('mssql');

module.exports = (app) => {
    app.route('/api/lunsau')
        .get(dataController.getData_Lunsau);
    app.route('/api/biendangkhecogian')
        .get(dataController.getData_Biendangkhecogian);
    app.route('/api/apluckerong')
        .get(dataController.getData_Apluckerong);
    app.route('/api/quantractham')
        .get(dataController.getData_Quantractham);
    app.route('/api/aplucmachdong')
        .get(dataController.getData_Aplucmachdong);
    app.route('/api/ungsuatcotthep')
        .get(dataController.getData_Ungsuatcotthep);

    app.route('/api/option_lunsau')
        .post(dataController.getDataOption_Lunsau);
    app.route('/api/option_biendangkhecogian')
        .post(dataController.getDataOption_Biendangkhecogian);
    app.route('/api/option_apluckerong')
        .post(dataController.getDataOption_Apluckerong);
    app.route('/api/option_quantractham')
        .post(dataController.getDataOption_Quantractham);
    app.route('/api/option_aplucmachdong')
        .post(dataController.getDataOption_Aplucmachdong);
    app.route('/api/option_ungsuatcotthep')
        .post(dataController.getDataOption_Ungsuatcotthep);

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

    app.route('/login')
        .post(userController.login);
    app.route('/signup')
        .post(userController.createNewUser);

}