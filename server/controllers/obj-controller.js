const sql = require('mssql');

export default class ObjController {
    map3D = async(req, res, next) => {
        res.render('map-3D', { title: 'map-3D' });
    };
}