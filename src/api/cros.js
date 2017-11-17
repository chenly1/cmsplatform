import axios from 'axios'
var qs = require('qs');

// let base = 'http://219.234.5.196:8087/phis'
// let base = 'http://192.168.0.249:8087/phis'
// let base = 'http://192.168.0.252:8190/BS-PHIS2.322'
let base = 'http://192.168.0.29:8190/BS-PHIS2.322'

// user 查询注册用户
export let findUser = (params) => {
    return axios.get(`${base}/cms/findUser?` + params, {});
};



