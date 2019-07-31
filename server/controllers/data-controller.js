import { stream } from 'winston';

const sql = require('mssql');
const conn = require('../config/db-config');

export default class DataController {

    BangBieu = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let request = await pool.request();
            // Get all sensors current value and merge into one array
            let sqlLunsau = "SELECT TOP 1 * FROM [1_Lunsau];";
            let Lunsau = await request.query(sqlLunsau).catch(err => { console.log(err); res.sendStatus(500);});
            let sqlBiendangkhecogian = "SELECT TOP 1 * FROM [2_Biendangkhecogian];";
            let Biendangkhecogian = await request.query(sqlBiendangkhecogian).catch(err => { console.log(err); res.sendStatus(500);});
            let sqlApluckerong = "SELECT TOP 1 * FROM [3_Apluckerong];";
            let Apluckerong = await request.query(sqlApluckerong).catch(err => { console.log(err); res.sendStatus(500);});
            let sqlQuantractham = "SELECT TOP 1 * FROM [4_Quantractham];";
            let Quantractham = await request.query(sqlQuantractham).catch(err => { console.log(err); res.sendStatus(500);});
            let sqlAplucmachdong = "SELECT TOP 1 * FROM [5_Aplucmachdong];";
            let Aplucmachdong = await request.query(sqlAplucmachdong).catch(err => { console.log(err); res.sendStatus(500);});
            let sqlUngsuatcotthep = "SELECT TOP 1 * FROM [6_Ungsuatcotthep];";
            let Ungsuatcotthep = await request.query(sqlUngsuatcotthep).catch(err => { console.log(err); res.sendStatus(500);});
            let currentValue = {...Lunsau.recordset[0], ...Biendangkhecogian.recordset[0], ...Apluckerong.recordset[0], ...Quantractham.recordset[0], ...Aplucmachdong.recordset[0], ...Ungsuatcotthep.recordset[0]};
            // Get sensors information and add current value into results
            let sqlGeneral = "SELECT ID_Sensor, Sign, Serial_Number, Type, Section, Unit, Up_Limit, Down_Limit FROM [GENERAL] ORDER BY ID_Sensor ASC";
            let General = await request.query(sqlGeneral).catch(err => { console.log(err); res.sendStatus(500);});
            General = General.recordset;
            General.forEach((sensor) => {
                sensor['Value'] = currentValue[sensor['Sign']];
            });
            sql.close();
            res.render('BangBieu', {
                pageTitle: 'Bảng Biểu',
                path: '/BangBieu',
                data: General
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };

    };
    getData_Lunsau = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT TOP 50 * FROM [1_Lunsau] ORDER BY Timestamp DESC";
            let request = await pool.request();
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getData_Biendangkhecogian = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT TOP 50 * FROM [2_Biendangkhecogian] ORDER BY Timestamp DESC";
            let request = await pool.request();
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getData_Apluckerong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT TOP 50 * FROM [3_Apluckerong] ORDER BY Timestamp DESC";
            let request = await pool.request();
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getData_Quantractham = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT TOP 50 * FROM [4_Quantractham] ORDER BY Timestamp DESC";
            let request = await pool.request();
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getData_Aplucmachdong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT TOP 50 * FROM [5_Aplucmachdong] ORDER BY Timestamp DESC";
            let request = await pool.request();
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getData_Ungsuatcotthep = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT TOP 50 * FROM [6_Ungsuatcotthep] ORDER BY Timestamp DESC";
            let request = await pool.request();
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_Lunsau = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT * FROM [1_Lunsau] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(startDay);
            console.log(endDay);
            request.input('startDay', sql.DateTime, startDay);
            request.input('endDay', sql.DateTime, endDay);
            request.query(sqlQuery, function(err, result) {
                if (err) {
                    sql.close();
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else {
                    sql.close();
                    console.log(result);
                    return res.status(200).json({
                        success: true,
                        data: result
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getDataOption_Biendangkhecogian = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT * FROM [2_Biendangkhecogian] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(startDay);
            console.log(endDay);
            request.input('startDay', sql.DateTime, startDay);
            request.input('endDay', sql.DateTime, endDay);
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getDataOption_Apluckerong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT * FROM [3_Apluckerong] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(startDay);
            console.log(endDay);
            request.input('startDay', sql.DateTime, startDay);
            request.input('endDay', sql.DateTime, endDay);
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getDataOption_Quantractham = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT * FROM [4_Quantractham] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(startDay);
            console.log(endDay);
            request.input('startDay', sql.DateTime, startDay);
            request.input('endDay', sql.DateTime, endDay);
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getDataOption_Aplucmachdong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT * FROM [5_Aplucmachdong] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(startDay);
            console.log(endDay);
            request.input('startDay', sql.DateTime, startDay);
            request.input('endDay', sql.DateTime, endDay);
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    getDataOption_Ungsuatcotthep = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let sqlQuery = "SELECT * FROM [6_Ungsuatcotthep] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(startDay);
            console.log(endDay);
            request.input('startDay', sql.DateTime, startDay);
            request.input('endDay', sql.DateTime, endDay);
            request.query(sqlQuery, function(err, result) {
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
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };


}