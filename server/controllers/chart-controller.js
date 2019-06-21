const sql = require ('mssql');
const conn = require('../config/db-config')();

export default class ChartController {
    showChart = async (req, res, next)=> {
        res.render('index', {title: 'Homepage'});
    };
    createChart = async (req, res, next)=> {
        res.render('index', {title: 'Homepage'});
    };
    homepage = async (req, res, next)=> {
            res.render('TongQuan', {
                pageTitle: 'Tong quan',
                path: '/'
            });  
    };
    lichSuBangBieu = async (req, res, next)=> {
        res.render('LichSuBangBieu', {
            pageTitle: 'Lich su bang bieu',
            path: '/LichSuBangBieu'
        });  
};
    getData = async (req, res, next)=> {      
        conn.connect(function () {
            try {
                let sqlQuery = "SELECT TOP 100 * FROM [GD2_NHIETDO] ORDER BY ID DESC";
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
}
