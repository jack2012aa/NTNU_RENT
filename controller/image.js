const mysql = require('../model/db');

const getUserWaitRent = async (email) => {
    const sql =
        'select p_name,photo,brand,price,days from  product natural join users where email=? and product_id not in (select product_id from contract);';
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getUserRent = async (email) => {
    const sql =
        "Select C.contract_id, product.photo, product.p_name, product.brand, product.price, C.start_date, C.end_date, product.days, R.name From contract as C join users as P on C.publish_id = P.user_id join users as R on C.rent_id = R.user_id join product on C.product_id = product.product_id Where C.c_status = 'continue' and P.email = ?";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                whoRent: result.name,
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                end_date: result.end_date,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getFinishRent = async (email) => {
    const sql =
        'Select C.contract_id, product.photo, product.p_name, product.brand, product.price, C.start_date, C.end_date, product.days, R.name From contract as C join users as P on C.publish_id = P.user_id join users as R on C.rent_id = R.user_id join product on C.product_id = product.product_id Where C.c_status = "finish" and P.email = ? and C.contract_id not in (select contract_id from eval)';
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                end_date: result.end_date,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getAllRent = async () => {
    const sql = 'SELECT * FROM rentlist';
    const results = await mysql.query(sql).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                paths: result.path,
                name: result.p_name,
                amount: result.amount,
                price: result.price,
                long: result.long,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getUserRentBack = async (email) => {
    const sql =
        "select contract_id,p_name,photo,brand,price,end_date,days from contract natural join product where rent_id=(select user_id from users where email=?) and c_status='continue' and contract_id not in (select contract_id from eval)";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                end_date: result.end_date,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};
const getFinishRentBack = async (email) => {
    const sql =
        "select contract_id,p_name,photo,brand,price,end_date,days from contract natural join product where rent_id=(select user_id from users where email=?) and c_status='finish' and contract_id not in (select contract_id from eval);";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                end_date: result.end_date,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const updateContractStatus = async (contract_id) => {
    const sql = "UPDATE Contract SET c_status = 'finish' WHERE contract_id= ?";
    const results = await mysql.query(sql, contract_id).catch((err) => {
        console.log(err);
    });
    if (results) {
        return { error: false, data: { status: true } };
    }
    return { error: true };
};

module.exports = {
    getUserWaitRent,
    getUserRent,
    getAllRent,
    getUserRentBack,
    updateContractStatus,
    getFinishRent,
    getFinishRentBack,
};
