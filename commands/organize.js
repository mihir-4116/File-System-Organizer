let fs = require("fs");
let path = require("path");
let types = {
    media : ["mp4","mkv"],
    arcnives: ['zip','7z','rar','tar','gz','ar','iso',"xz"],
    documents : ['docs','doc','pdf','xlsx','xls','odt','ods','odp','odf','txt','ps','tex'],
    app : ['exe','dng','pkg',"deb"]
}
function organizefn(dirpath){
    let destpath;
    // console.log("organize command implemented for ",dirpath);
    if(dirpath==undefined){
        // console.log("Kindly Enter a correct path");
        destpath = process.cwd();
        return;
    }else{
        let doesexist =  fs.existsSync(dirpath);
        if(doesexist){
        destpath =   path.join(dirpath,"organized_files");
        if(fs.existsSync(destpath)==false){
        fs.mkdirSync(destpath);
        }
        }else{
            console.log("Kindly Enter correct path");
            return;
        }
    }
    organizehelper(dirpath,destpath);

}
function organizehelper(src,dest){
    let childname = fs.readdirSync(src);
    for(let i=0;i<childname.length;i++){
        let childaddress = path.join(src,childname[i]);
        let isfile =  fs.lstatSync(childaddress).isFile();
        if(isfile){
            // console.log(childname[i]);
            let category = getCategory(childname[i]);
            sendfiles(childaddress,dest,category);
        }
    }
}
function sendfiles(srcFilePath,dest,category){
    let categotyPath = path.join(dest,category);
    if(fs.existsSync(categotyPath)==false){
        fs.mkdirSync(categotyPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categotyPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
}
function getCategory(name){
    let ext = path.extname(name);
    // console.log(ext);
    ext = ext.slice(1);
    for(let type in types){
        let ctypearray = types[type];
        for(let i=0;i<ctypearray.length;i++){
          if(ext==ctypearray[i]){
              return type;
          }
        }
    }
    return "others";
}
module.exports = {
    organizeKey : organizefn
}