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
}

// 素材管理-不带查询
export const getMaterialData = () => { 
    return axios.get(`${base}/materialData`, {  }); 
}

export const submit = (url, params) => {
    return axios.post(url, params)
}

export const getListData = (url) => {
    return axios.get(url, {})
}

export const update = (url, params) => {
    return axios.put(url, params)
}

export const stateUpdate = (url) => {
    return axios.patch(url,{})
}

export const deleteData = (url) => {
    return axios.delete(url)
}

export const videoInit = (params)=>{
    return axios.post(`/manager/video/init`,params)
}

export const videoUpload = (params)=>{
    var instance = axios.create({
        headers: {'Content-Type': 'multipart/form-data'}
      });
    return instance.post(`/manager/video/upload`,params)
}


export const videoFinish = (params)=>{
    return axios.post(`/manager/video/finish`,params)
}


