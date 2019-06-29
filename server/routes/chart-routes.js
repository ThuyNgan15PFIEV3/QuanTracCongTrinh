'use strict';

import {chartController} from '../controllers';
import {exportController} from '../controllers';
const sql = require ('mssql');

module.exports = (app) => {
    app.route('/showChart')
        .get(chartController.showChart);
    app.route('/getData')
        .get(chartController.getData);
    app.route('/delete/:id')
        .delete(chartController.deleteData);
    app.route('/')
        .get(chartController.homepage); 
    app.route('/LichSuBangBieu')
        .get(chartController.lichSuBangBieu); 
    app.route('/BangBieu')
        .get(chartController.BangBieu);
    app.route('/Users')
        .get(chartController.Users);
    app.route('/BaoCao')
        .get(chartController.BaoCao);
    app.route('/expDocx')
        .get(exportController.expDocx);
}