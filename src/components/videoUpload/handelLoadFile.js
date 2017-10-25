
import {videoInit,videoUpload,videoFinish} from '@/api/api'
function fileSlice (file,unit){
    let start = 0
    var fileList= []
    if(file.size< unit){
        let fileInfo = {
            file:file,
            offset:0
        }
        fileList.push(fileInfo)
    }
    else{
        for (let start = 0; start < file.size + unit; start += unit) {
            if(start<=file.size){
            let chunk = file.slice(start, start + unit)
            let fileInfo={
                file:chunk,
                offset:start
            }
            fileList.push(fileInfo)
        }
        }
    }
    return fileList
}

function getHash(file){
    return new Promise(function(resolve, reject) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
        // blob 类型转换为 wardArray，否则计算不正确
        var fileWordArray = CryptoJS.lib.WordArray.create(this.result)
        //console.log(fileWordArray)
        var sha1Hash = CryptoJS.SHA1(fileWordArray)
        var resultHash = sha1Hash.toString()
        resolve(resultHash)
    }
    reader.onerr = reject
})
}

function getLocalFileInfo(file) {
    var fileSize = file.size;
    var fullFileName = file.name.match(/([^\\^\/^\:^\?^\|^\<^\>^\|])*(\.)(.{1,8})$/)[0];
    var fileName = fullFileName.match(/[^\.]+/)[0];
    var fileTypeMatchs = file.name.match(/.+(\.\w+)$/i);
    var fileType = fileTypeMatchs ? fileTypeMatchs[1].replace(".", "") : "";
    var mimeType = file.type;
    return {
        fileName : fileName,
        fileSize : fileSize,
        fileType : fileType
    }
}
function getProgress(list){
let count = 0;
for(let item of list){
    if(item.upload == true){
        count++;
    }
}
return (count/list.length).toFixed(2)
}


 async function handeLoadFile(file,videoName,progress){
    let unit = 4 * 1024 * 1024
    let list = fileSlice(file,unit)
    let sha1
    await getHash(file).then(function(result){
        sha1 = result
    })
    for(let item of list){
        await getHash(item.file).then(function(result) {
            item.sha1 = result
         })
    }

    return new Promise(function(resolve, reject) {
    let params = getLocalFileInfo(file)
    params.videoName = videoName
    params.fileSha = sha1
    params.dataSize = unit
    params.screenshot = 1
    params.watermark = 1
    params.transcode =1
    videoInit(params).then(async function(result){
          if(result.data.code != 2000){
              throw new Error(result)
          }
          for(let item of list){
            let formData = new FormData("<form></form>");
            formData.append('fileSha', sha1);
            formData.append('offset', item.offset);
            formData.append('dataSize', item.file.size);
            formData.append('dataSha', item.sha1);
            formData.append('file', item.file);
            await videoUpload(formData).then(function(result){
                if(result.data.code != 2000){
                    throw new Error(result)
                }
                else{
                    item.upload = true
                }
                if(typeof(progress)=='function'){
                    progress(getProgress(list),list)
                 }
              })
          }
          videoFinish({'fileSha':sha1}).then(function(result){
            if(result.data.code == 2000){
                resolve(result.data)
              }
              else{
                throw new Error(result)
              }
          })
   }).catch(function(err){
    reject(err)
   })
})
   
}

export default handeLoadFile


