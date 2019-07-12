const sql = require('mssql');

export default class LoadPageController {
    homepage = async(req, res, next) => {
        res.render('TongQuan', {
            pageTitle: 'Tong quan',
            path: '/'
        });
    };
    lichSuBangBieu = async(req, res, next) => {
        res.render('LichSuBangBieu', {
            pageTitle: 'Lich su bang bieu',
            path: '/LichSuBangBieu'
        });
    };
    Users = async(req, res, next) => {
        res.render('Users', {
            pageTitle: 'Quản trị người dùng',
            path: '/Users'
        });
    };
    BaoCao = async(req, res, next) => {
        res.render('BaoCao', {
            pageTitle: 'Báo cáo',
            path: '/BaoCao'
        });
    };
}