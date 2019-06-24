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
    BangBieu = async (req, res, next)=> {
        conn.connect(function () {
            try {
                let sqlQuery = "SELECT TOP 100 * FROM [GD2_NHIETDO] ORDER BY ID DESC";
                let req = new sql.Request(conn);
                req.query(sqlQuery, function (err, data) {
                    if (err) {
                        conn.close(); 
                        console.log(err.message);
                        res.sendStatus(500);
                    }
                    else {
                        conn.close();
                        res.render('BangBieu', {
                            pageTitle: 'Bảng Biểu',
                            path: '/BangBieu',
                            data: data
                        });
                    }     
                })
            } catch (e) {
                conn.close(); 
                console.log(e.message);
                res.sendStatus(500);
            }
            
        })
    };
    Users = async (req, res, next)=> {
        res.render('Users', {
            pageTitle: 'Quản trị người dùng',
            path: '/Users'
        });  
    };
    BaoCao = async (req, res, next)=> {
        res.render('BaoCao', {
            pageTitle: 'Báo cáo',
            path: '/BaoCao'
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
