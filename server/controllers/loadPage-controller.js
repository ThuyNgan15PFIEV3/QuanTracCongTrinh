const sql = require('mssql');

export default class LoadPageController {
    homepage = async(req, res, next) => {
        res.render('TongQuan', {
            pageTitle: 'Tong quan',
            path: '/'
        });
    };
    lichSuBangBieu_LunSau = async(req, res, next) => {
        res.render('LichSuBangBieu_LunSau', {
            pageTitle: 'Lún sâu',
            path: '/LichSuBangBieu/LunSau'
        });
    };
    lichSuBangBieu_BienDangKheCoGian = async(req, res, next) => {
        res.render('LichSuBangBieu_BienDangKheCoGian', {
            pageTitle: 'Biến dạng khe co giãn',
            path: '/LichSuBangBieu/BienDangKheCoGian'
        });
    };
    lichSuBangBieu_ApLucKeRong = async(req, res, next) => {
        res.render('LichSuBangBieu_ApLucKeRong', {
            pageTitle: 'Áp lực kẻ rỗng',
            path: '/LichSuBangBieu/ApLucKeRong'
        });
    };
    lichSuBangBieu_QuanTracTham = async(req, res, next) => {
        res.render('LichSuBangBieu_QuanTracTham', {
            pageTitle: 'Quan trắc thấm',
            path: '/LichSuBangBieu/QuanTracTham'
        });
    };
    boTriChung = async(req, res, next) => {
        res.render('BoTriChung', {
            pageTitle: 'Bố trí chung',
            path: 'TongQuan/BoTriChung'
        });
    };
    lichSuBangBieu_ApLucMachDong = async(req, res, next) => {
        res.render('LichSuBangBieu_ApLucMachDong', {
            pageTitle: 'Áp lực mạch động',
            path: '/LichSuBangBieu/ApLucMachDong'
        });
    };
    lichSuBangBieu_UngSuatCotThep = async(req, res, next) => {
        res.render('LichSuBangBieu_UngSuatCotThep', {
            pageTitle: 'Ứng suất cốt thép',
            path: '/LichSuBangBieu/UngSuatCotThep'
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