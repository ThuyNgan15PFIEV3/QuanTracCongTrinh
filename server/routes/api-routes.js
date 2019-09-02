'use strict';

import { dataController, exportController, objController, warningController, loadPageController, userController } from '../controllers';

const sql = require('mssql');

module.exports = (app) => {
    app.route('/api/lunSau_tatCa')
        .get(dataController.getData_LunSau_TatCa);
    app.route('/api/bienDangKheCoGian_tatCa')
        .get(dataController.getData_BienDangKheCoGian_TatCa);
    app.route('/api/apLucKeRong_tatCa')
        .get(dataController.getData_ApLucKeRong_TatCa);
    app.route('/api/QuanTracTham_tatCa')
        .get(dataController.getData_QuanTracTham_TatCa);
    app.route('/api/apLucMachDong_tatCa')
        .get(dataController.getData_ApLucMachDong_TatCa);
    app.route('/api/ungSuatCotThep_tatCa')
        .get(dataController.getData_UngSuatCotThep_TatCa);

    app.route('/api/lunSau')
        .post(dataController.getData_LunSau);
    app.route('/api/bienDangKheCoGian')
        .post(dataController.getData_BienDangKheCoGian);
    app.route('/api/apLucKeRong')
        .post(dataController.getData_ApLucKeRong);
    app.route('/api/QuanTracTham')
        .post(dataController.getData_QuanTracTham);
    app.route('/api/apLucMachDong')
        .post(dataController.getData_ApLucMachDong);
    app.route('/api/ungSuatCotThep')
        .post(dataController.getData_UngSuatCotThep);

    app.route('/api/option_lunSau')
        .post(dataController.getDataOption_LunSau);
    app.route('/api/option_bienDangKheCoGian')
        .post(dataController.getDataOption_BienDangKheCoGian);
    app.route('/api/option_apLucKeRong')
        .post(dataController.getDataOption_ApLucKeRong);
    app.route('/api/option_quanTracTham')
        .post(dataController.getDataOption_QuanTracTham);
    app.route('/api/option_apLucMachDong')
        .post(dataController.getDataOption_ApLucMachDong);
    app.route('/api/option_ungSuatCotThep')
        .post(dataController.getDataOption_UngSuatCotThep);

    // app.route('/api/option_lunSau_tuyen')
    //     .post(dataController.getDataOption_LunSau_Tuyen);
    // app.route('/api/option_bienDangKheCoGian_tuyen')
    //     .post(dataController.getDataOption_BienDangKheCoGian_Tuyen);
    // app.route('/api/option_apLucKeRong_tuyen')
    //     .post(dataController.getDataOption_ApLucKeRong_Tuyen);
    // app.route('/api/option_quanTracTham_tuyen')
    //     .post(dataController.getDataOption_QuanTracTham_Tuyen);
    // app.route('/api/option_apLucMachDong_tuyen')
    //     .post(dataController.getDataOption_ApLucMachDong_Tuyen);
    // app.route('/api/option_ungSuatCotThep_tuyen')
    //     .post(dataController.getDataOption_UngSuatCotThep_Tuyen);

    app.route('/api/option_lunSau_tuyen_thoiGian')
        .post(dataController.getDataOption_LunSau_Tuyen_ThoiGian);
    app.route('/api/option_bienDangKheCoGian_tuyen_thoiGian')
        .post(dataController.getDataOption_BienDangKheCoGian_Tuyen_ThoiGian);
    app.route('/api/option_apLucKeRong_tuyen_thoiGian')
        .post(dataController.getDataOption_ApLucKeRong_Tuyen_ThoiGian);
    app.route('/api/option_quanTracTham_tuyen_thoiGian')
        .post(dataController.getDataOption_QuanTracTham_Tuyen_ThoiGian);
    app.route('/api/option_apLucMachDong_tuyen_thoiGian')
        .post(dataController.getDataOption_ApLucMachDong_Tuyen_ThoiGian);
    app.route('/api/option_ungSuatCotThep_tuyen_thoiGian')
        .post(dataController.getDataOption_UngSuatCotThep_Tuyen_ThoiGian);
    app.route('/api/selectType_lunSau')
        .get(dataController.selectType_LunSau);
    app.route('/api/selectType_bienDangKheCoGian')
        .get(dataController.selectType_BienDangKheCoGian);
    app.route('/api/selectType_apLucKeRong')
        .get(dataController.selectType_ApLucKeRong);
    app.route('/api/selectType_quanTracTham')
        .get(dataController.selectType_QuanTracTham);
    app.route('/api/selectType_ungSuatCotThep')
        .get(dataController.selectType_UngSuatCotThep);
    app.route('/api/selectType_apLucMachDong')
        .get(dataController.selectType_ApLucMachDong);

    app.route('/api/getSensor')
        .post(dataController.getSensor);

    app.route('/')
        .get(loadPageController.homepage);
    app.route('/LichSuBangBieu/LunSau')
        .get(loadPageController.lichSuBangBieu_LunSau);
    app.route('/LichSuBangBieu/BienDangKheCoGian')
        .get(loadPageController.lichSuBangBieu_BienDangKheCoGian);
    app.route('/LichSuBangBieu/ApLucKeRong')
        .get(loadPageController.lichSuBangBieu_ApLucKeRong);
    app.route('/LichSuBangBieu/QuanTracTham')
        .get(loadPageController.lichSuBangBieu_QuanTracTham);
    app.route('/LichSuBangBieu/ApLucMachDong')
        .get(loadPageController.lichSuBangBieu_ApLucMachDong);
    app.route('/LichSuBangBieu/UngSuatCotThep')
        .get(loadPageController.lichSuBangBieu_UngSuatCotThep);

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