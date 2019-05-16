'use strict';

import {chartController} from '../controllers';
const sql = require ('mssql');

module.exports = (app) => {
    app.route('/showChart')
        .get(chartController.showChart);
    app.route('/createChart')
        .get(chartController.createChart);
    app.route('/getData')
        .get(chartController.getData);
    app.route('/delete/:id')
        .delete(chartController.deleteData);
}