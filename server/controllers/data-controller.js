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
            let Lunsau = await request.query(sqlLunsau).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
            let sqlBiendangkhecogian = "SELECT TOP 1 * FROM [2_Biendangkhecogian];";
            let Biendangkhecogian = await request.query(sqlBiendangkhecogian).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
            let sqlApluckerong = "SELECT TOP 1 * FROM [3_Apluckerong];";
            let Apluckerong = await request.query(sqlApluckerong).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
            let sqlQuantractham = "SELECT TOP 1 * FROM [4_Quantractham];";
            let Quantractham = await request.query(sqlQuantractham).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
            let sqlAplucmachdong = "SELECT TOP 1 * FROM [5_Aplucmachdong];";
            let Aplucmachdong = await request.query(sqlAplucmachdong).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
            let sqlUngsuatcotthep = "SELECT TOP 1 * FROM [6_Ungsuatcotthep];";
            let Ungsuatcotthep = await request.query(sqlUngsuatcotthep).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
            let currentValue = {...Lunsau.recordset[0], ...Biendangkhecogian.recordset[0], ...Apluckerong.recordset[0], ...Quantractham.recordset[0], ...Aplucmachdong.recordset[0], ...Ungsuatcotthep.recordset[0] };
            // Get sensors information and add current value into results
            let sqlGeneral = "SELECT ID_Sensor, Sign, Serial_Number, Type, Section, Unit, Up_Limit, Down_Limit FROM [GENERAL] ORDER BY ID_Sensor ASC";
            let General = await request.query(sqlGeneral).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
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
    getData_LunSau_TatCa = async(req, res, next) => {
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
    getData_LunSau = async(req, res, next) => {
        try {
            sql.close();
            let pool = await sql.connect(conn);
            let type = "Lun sau";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery2 = "SELECT TOP 50 Timestamp, " + str + " FROM [1_Lunsau] ORDER BY Timestamp DESC";
            let result2 = await pool.request().query(sqlQuery2);
            return res.status(200).json({
                success: true,
                data: result2
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_LunSau = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Lun sau";
            let section = req.body.section;
            let serial_Number = req.body.serialNum;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "' AND Serial_Number = '" + serial_Number + "' ;";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT Timestamp, " + str + " FROM [1_Lunsau] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(serial_Number);
            console.log(section);
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
    getDataOption_LunSau_Tuyen = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Lun sau";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT TOP 50 Timestamp, " + str + " FROM [1_Lunsau] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(section);
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

    getData_BienDangKheCoGian_TatCa = async(req, res, next) => {
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
    getData_BienDangKheCoGian = async(req, res, next) => {
        try {
            sql.close();
            let pool = await sql.connect(conn);
            let type = "Bien dang khe co gian";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery2 = "SELECT TOP 50 Timestamp, " + str + " FROM [2_Biendangkhecogian] ORDER BY Timestamp DESC";
            let result2 = await pool.request().query(sqlQuery2);
            return res.status(200).json({
                success: true,
                data: result2
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_BienDangKheCoGian = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Bien dang khe co gian";
            let section = req.body.section;
            let serial_Number = req.body.serialNum;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "' AND Serial_Number = '" + serial_Number + "' ;";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT Timestamp, " + str + " FROM [2_Biendangkhecogian] WHERE Timestamp BETWEEN @startDay AND @endDay";
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
    getDataOption_BienDangKheCoGian_Tuyen = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Bien dang khe co gian";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT TOP 50 Timestamp, " + str + " FROM [2_Biendangkhecogian] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(section);
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

    getData_ApLucKeRong_TatCa = async(req, res, next) => {
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
    getData_ApLucKeRong = async(req, res, next) => {
        try {
            sql.close();
            let pool = await sql.connect(conn);
            let type = "Ap luc ke rong";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery2 = "SELECT TOP 50 Timestamp, " + str + " FROM [3_Apluckerong] ORDER BY Timestamp DESC";
            let result2 = await pool.request().query(sqlQuery2);
            return res.status(200).json({
                success: true,
                data: result2
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_ApLucKeRong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ap luc ke rong";
            let section = req.body.section;
            let serial_Number = req.body.serialNum;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "' AND Serial_Number = '" + serial_Number + "' ;";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT Timestamp, " + str + " FROM [3_Apluckerong] WHERE Timestamp BETWEEN @startDay AND @endDay";
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
    getDataOption_ApLucKeRong_Tuyen = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ap luc ke rong";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT TOP 50 Timestamp, " + str + " FROM [3_Apluckerong] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(section);
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

    getData_QuanTracTham_TatCa = async(req, res, next) => {
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
    getData_QuanTracTham = async(req, res, next) => {
        try {
            sql.close();
            let pool = await sql.connect(conn);
            let type = "Quan trac tham";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery2 = "SELECT TOP 50 Timestamp, " + str + " FROM [4_Quantractham] ORDER BY Timestamp DESC";
            let result2 = await pool.request().query(sqlQuery2);
            return res.status(200).json({
                success: true,
                data: result2
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_QuanTracTham = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Quan trac tham";
            let section = req.body.section;
            let serial_Number = req.body.serialNum;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "' AND Serial_Number = '" + serial_Number + "' ;";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT Timestamp, " + str + " FROM [4_Quantractham] WHERE Timestamp BETWEEN @startDay AND @endDay";
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
    getDataOption_QuanTracTham_Tuyen = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Quan trac tham";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT TOP 50 Timestamp, " + str + " FROM [4_Quantractham] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(section);
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

    getData_ApLucMachDong_TatCa = async(req, res, next) => {
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
    getData_ApLucMachDong = async(req, res, next) => {
        try {
            sql.close();
            let pool = await sql.connect(conn);
            let type = "Ap luc mach dong";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery2 = "SELECT TOP 50 Timestamp, " + str + " FROM [5_Aplucmachdong] ORDER BY Timestamp DESC";
            let result2 = await pool.request().query(sqlQuery2);
            return res.status(200).json({
                success: true,
                data: result2
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_ApLucMachDong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ap luc mach dong";
            let section = req.body.section;
            let serial_Number = req.body.serialNum;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "' AND Serial_Number = '" + serial_Number + "' ;";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT Timestamp, " + str + " FROM [5_Aplucmachdong] WHERE Timestamp BETWEEN @startDay AND @endDay";
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
    getDataOption_ApLucMachDong_Tuyen = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ap luc mach dong";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT TOP 50 Timestamp, " + str + " FROM [5_Aplucmachdong] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(section);
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

    getData_UngSuatCotThep_TatCa = async(req, res, next) => {
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
    getData_UngSuatCotThep = async(req, res, next) => {
        try {
            sql.close();
            let pool = await sql.connect(conn);
            let type = "Ung suat cot thep";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery2 = "SELECT TOP 50 Timestamp, " + str + " FROM [6_UngSuatCotThep] ORDER BY Timestamp DESC";
            let result2 = await pool.request().query(sqlQuery2);
            return res.status(200).json({
                success: true,
                data: result2
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };

    getDataOption_UngSuatCotThep = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ung suat cot thep";
            let section = req.body.section;
            let serial_Number = req.body.serialNum;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "' AND Serial_Number = '" + serial_Number + "' ;";
            let result1 = await pool.request()
                .query(sqlQuery1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT Timestamp, " + str + " FROM [6_Ungsuatcotthep] WHERE Timestamp BETWEEN @startDay AND @endDay";
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

    getDataOption_UngSuatCotThep_Tuyen = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ung suat cot thep";
            let section = req.body.section;
            let sqlQuery1 = "SELECT Sign FROM [GENERAL] WHERE Type = '" + type + "' AND Section = '" + section + "';";
            let result1 = await pool.request()
                .query(sqlQuery1);
            console.log(result1);
            let sensor = [];
            for (let i = 0; i < result1.recordset.length; i++) {
                sensor.push(result1.recordset[i].Sign);
            }
            let str = sensor[0];
            for (let i = 1; i < sensor.length; i++) {
                str = str + "," + sensor[i];
            }
            let sqlQuery = "SELECT TOP 50 Timestamp, " + str + " FROM [6_Ungsuatcotthep] WHERE Timestamp BETWEEN @startDay AND @endDay";
            let request = await pool.request();
            let startDay = new Date(req.body.startDay);
            let endDay = new Date(req.body.endDay);
            console.log(sqlQuery);
            console.log(section);
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
    selectType_LunSau = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Lun sau";
            let sqlQuery = "SELECT Serial_Number, Section FROM [GENERAL] WHERE Type = '" + type + "'";
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
                        data: result.recordset
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    };
    selectType_BienDangKheCoGian = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Bien dang khe co gian";
            let sqlQuery = "SELECT Serial_Number, Section FROM [GENERAL] WHERE Type = '" + type + "'";
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
                        data: result.recordset
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    }

    selectType_ApLucKeRong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ap luc ke rong";
            let sqlQuery = "SELECT Serial_Number, Section FROM [GENERAL] WHERE Type = '" + type + "'";
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
                        data: result.recordset
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    }

    selectType_QuanTracTham = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Quan trac tham";
            let sqlQuery = "SELECT Serial_Number, Section FROM [GENERAL] WHERE Type = '" + type + "'";
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
                        data: result.recordset
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    }

    selectType_ApLucMachDong = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ap luc mach dong";
            let sqlQuery = "SELECT Serial_Number, Section FROM [GENERAL] WHERE Type = '" + type + "'";
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
                        data: result.recordset
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    }

    selectType_UngSuatCotThep = async(req, res, next) => {
        try {
            let pool = await sql.connect(conn);
            let type = "Ung suat cot thep";
            let sqlQuery = "SELECT Serial_Number, Section FROM [GENERAL] WHERE Type = '" + type + "'";
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
                        data: result.recordset
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
            res.sendStatus(500);
        };
    }


}