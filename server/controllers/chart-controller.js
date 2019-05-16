const sql = require ('mssql');
const conn = require('../config/db-config')();

export default class ChartController {
    showChart = async (req, res, next)=> {
        res.render('index', {title: 'Homepage'});
    };
    createChart = async (req, res, next)=> {
        res.render('index', {title: 'Homepage'});
        
        
    };
    getData = async (req, res, next)=> {      
        conn.connect(function () {
            try {
                let sqlQuery = "SELECT TOP 30 * FROM [GD2_NHIETDO] ORDER BY ID DESC";
                let req = new sql.Request(conn);
                req.query(sqlQuery, function (err, data) {
                    if (err) {
                        conn.close(); 
                        return res.status(400).json({
                        success: false,
                        data: err.message
                        });
                    }
                    else {
                        conn.close();
                        return res.status(200).json({
                            success: true,
                            data: data
                        });
                    }     
                })
            } catch (e) {
                conn.close(); 
                return res.status(400).json({
                    success: false,
                    data: e.message
                });
            }
            
        })     
    };
    // createData = async (req, res, next) => {   
    //     let id = req.body.id;
    //     let time = req.body.time;
    //     let sensor_1 = req.body.sensor_1;
    //     let sensor_2 = req.body.sensor_2;
    //     let sensor_3 = req.body.sensor_3;
    //     let sensor_4 = req.body.sensor_4;
    //     conn.connect(function () {
    //         try {
    //             // let sqlQuery = INSERT INTO `Table1`(`ID`, `time`, `sensor_1`, `sensor_2`, `sensor_3`,`sensor_4` ) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5]);
    //             let req = new sql.Request(conn);
    //             req.query(sqlQuery, function (err, data) {
    //                 if (err) { 
    //                     conn.close(); 
    //                     return res.status(400).json({
    //                     success: false,
    //                     data: err.message
    //                     });
    //                 }
    //                 else {
    //                     conn.close();
    //                     return res.status(200).json({
    //                         success: "Delete success",
    //                         data: data
    //                     });
    //                 }     
    //             })
    //         } catch (e) {
    //             conn.close(); 
    //             return res.status(400).json({
    //                 success: false,
    //                 data: e.message
    //             });
    //         }
            
    //     })     
    // };
    deleteData = async (req, res, next) => {   
        var id = req.params.id; 
        conn.connect(function () {
            try {
                let sqlQuery = "DELETE FROM [Table1] WHERE ID = " + id;
                let req = new sql.Request(conn);
                req.query(sqlQuery, function (err, data) {
                    if (err) { 
                        conn.close(); 
                        return res.status(400).json({
                        success: false,
                        data: err.message
                        });
                    }
                    else {
                        conn.close();
                        return res.status(200).json({
                            success: "Delete success",
                            data: data
                        });
                    }     
                })
            } catch (e) {
                conn.close(); 
                return res.status(400).json({
                    success: false,
                    data: e.message
                });
            }
            
        })     
    };
};