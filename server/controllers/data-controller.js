import { stream } from 'winston';

const sql = require('mssql');
const conn = require('../config/db-config');
export default class DataController {
    BangBieu = async(req, res, next) => {
        sql.connect(conn, function() {
            try {
                let sqlQuery = "SELECT TOP 100 * FROM [GD2_NHIETDO] ORDER BY ID DESC";
                let req = new sql.Request();
                req.query(sqlQuery, function(err, data) {
                    if (err) {
                        sql.close();
                        console.log(err.message);
                        res.sendStatus(500);
                    } else {
                        sql.close();
                        res.render('BangBieu', {
                            pageTitle: 'Bảng Biểu',
                            path: '/BangBieu',
                            data: data
                        });
                    }
                })
            } catch (e) {
                sql.close();
                console.log(e.message);
                res.sendStatus(500);
            }

        })
    };

    getData = async(req, res, next) => {
        sql.connect(conn, function(err) {
            if (err) {
                console.log("Error while connecting database :- " + err);
                res.send(err);
            } else {
                let req = new sql.Request();
                req.query("SELECT TOP 50 * FROM [GD2_NHIETDO] ORDER BY ID DESC", function(err, result) {
                    if (err) {
                        sql.close();
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    } else {
                        sql.close();
                        return res.status(200).json({
                            success: true,
                            data: result
                        });
                    }
                });
            }
        });
    };
    getDataOption = async(req, res, next) => {
        sql.connect(conn, function(err) {
            if (err) {
                console.log("Error while connecting database :- " + err);
                res.send(err);
            } else {
                let request = new sql.Request();
                let startDay = new Date(req.body.startDay);
                let endDay = new Date(req.body.endDay);
                console.log(startDay);
                console.log(endDay);
                request.input('startDay', sql.DateTime, startDay);
                request.input('endDay', sql.DateTime, endDay);
                // query to the database
                request.query("SELECT * FROM [GD2_NHIETDO] WHERE Time BETWEEN @startDay AND @endDay ", function(err, result) {
                    if (err) {
                        sql.close();
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    } else {
                        sql.close();
                        console.log(result);
                        // res.send(result);
                        return res.status(200).json({
                            success: true,
                            data: result
                        });
                    }
                });
            }
        });
    };
}