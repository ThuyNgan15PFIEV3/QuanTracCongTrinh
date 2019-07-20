const bcrypt = require('bcryptjs');
import { JWTHelper } from '../helpers';

const sql = require('mssql');
const conn = require('../config/db-config');
export default class UserController {
    async checkExistedUser(email) {
        try {
            let sqlQuery = "SELECT * FROM [User] WHERE email=@email";
            let pool = await sql.connect(conn);
            let request = await pool.request();
            request.input('email', sql.NVarChar, email);
            request.query(sqlQuery, function(err, result) {
                if (err) {
                    sql.close();
                    console.log("Error while querying database :- " + err);
                }
                sql.close();
                return result.recordset.length !== 0;
            });
        } catch (e) {
            sql.close();
            console.log(e.message);
        }
    }
    login = async(req, res, next) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            if (email === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "email is required filed"
                })
            }
            if (password === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "password is required filed"
                })
            }
            let sqlQuery = "SELECT * FROM [GD2_User] WHERE email=@email";
            let pool = await sql.connect(conn);
            let request = await pool.request();
            request.input('email', sql.NVarChar, email);
            request.input('password', sql.NVarChar, password);
            request.query(sqlQuery, async function(err, result) {
                if (err) {
                    sql.close();
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else if (result.recordset.length !== 0) {
                    const data = result.recordset;
                    // const isValidPassword = await bcrypt.compareSync(password, data.password);
                    // if (!isValidPassword) {
                    //     return res.json({
                    //         success: false,
                    //         error: "Password is wrong"
                    //     });
                    // }
                    // Gen token
                    // const token = await JWTHelper.sign({
                    //     id: data.ID,
                    //     hoTen: data.hoTen,
                    //     email: data.email

                    // });
                    console.log(data);
                    return res.status(200).json({
                        success: true
                    });
                } else {
                    sql.close();
                    console.log('dsds');
                    return res.status(400).json({
                        success: false
                    });
                }
            });
        } catch (e) {
            sql.close();
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };
    createNewUser = async(req, res, next) => {
        try {
            let ID = req.body.ID;
            let email = req.body.email;
            let password = req.body.password;
            let hoTen = req.body.hoTen;
            let diaChi = req.body.diaChi;
            let chucVu = req.body.chucVu;
            let hashedPass = bcrypt.hashSync(password, 10);
            if (email === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "email is required filed"
                })
            };
            if (password === undefined) {
                return res.status(400).json({
                    success: false,
                    error: "password is required filed"
                })
            };
            let user = this.checkExistedUser(email);
            if (user) {
                console.log("email is existed");
                return res.status(400).json({
                    success: false,
                    error: "Email is existed!"
                })
            } else {
                sql.close();
                let sqlQuery = "INSERT INTO [GD2_User] (ID, email, password, hoTen, diaChi, chucVu) VALUES (@ID, @email, @password, @hoTen, @diaChi, @chucVu)";
                let pool = await sql.connect(conn);
                let request = await pool.request();
                request.input('ID', sql.NVarChar, ID);
                request.input('email', sql.NVarChar, email);
                request.input('password', sql.NVarChar, hashedPass);
                request.input('hoTen', sql.NVarChar, hoTen);
                request.input('diaChi', sql.NVarChar, diaChi);
                request.input('chucVu', sql.NVarChar, chucVu);
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
            }
        } catch (e) {
            sql.close();
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            })
        }
    };

};