import axios from 'axios'

let base = '/apis'

export const getArticles =()=>{
    return axios.get(`${base}/list`,{});
};

// 带查询
// export const getPageListData = params => { 
//     return axios.get(`${base}/pageListData`, { params: params }); 
// };

// 模版消息-不带查询
export const getPageListData = () => { 
    return axios.get(`${base}/pageListData`, {  }); 
};

// 素材管理-不带查询
export const getMaterialData = () => { 
    return axios.get(`${base}/materialData`, {  }); 
};