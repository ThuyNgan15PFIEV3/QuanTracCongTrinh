const sql = require('mssql');

export default class LoadPageController {
    homepage = async(req, res, next) => {
        res.render('TongQuan', {
            pageTitle: 'Tong quan',
            path: '/'
        });
    };
    LichSuDuLieu_LunSau = async(req, res, next) => {
        res.render('LichSuDuLieu_LunSau', {
            pageTitle: 'Lún sâu',
            path: '/LichSuDuLieu/LunSau'
        });
    };
    LichSuDuLieu_BienDangKheCoGian = async(req, res, next) => {
        res.render('LichSuDuLieu_BienDangKheCoGian', {
            pageTitle: 'Biến dạng khe co giãn',
            path: '/LichSuDuLieu/BienDangKheCoGian'
        });
    };
    LichSuDuLieu_ApLucKeRong = async(req, res, next) => {
        res.render('LichSuDuLieu_ApLucKeRong', {
            pageTitle: 'Áp lực kẻ rỗng',
            path: '/LichSuDuLieu/ApLucKeRong'
        });
    };
    LichSuDuLieu_QuanTracTham = async(req, res, next) => {
        res.render('LichSuDuLieu_QuanTracTham', {
            pageTitle: 'Quan trắc thấm',
            path: '/LichSuDuLieu/QuanTracTham'
        });
    };
    LichSuDuLieu_ApLucMachDong = async(req, res, next) => {
        res.render('LichSuDuLieu_ApLucMachDong', {
            pageTitle: 'Áp lực mạch động',
            path: '/LichSuDuLieu/ApLucMachDong'
        });
    };
    LichSuDuLieu_UngSuatCotThep = async(req, res, next) => {
        res.render('LichSuDuLieu_UngSuatCotThep', {
            pageTitle: 'Ứng suất cốt thép',
            path: '/LichSuDuLieu/UngSuatCotThep'
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