let fs = require("fs");
let path = require("path");
function treefn(dirpath){
    // console.log("Tree command implemented for ",dirpath);
    // let destpath;
    // console.log("organize command implemented for ",dirpath);
    if(dirpath==undefined){
        // process.cwd();
        treeHelper(process.cwd(),"");
        return;
    }else{
        let doesexist =  fs.existsSync(dirpath);
        if(doesexist){
          treeHelper(dirpath,"");
        }else{
            console.log("Kindly Enter correct path");
            return;
        }
    }
}
function treeHelper(dirpath,indent){
    let isFile = fs.lstatSync(dirpath).isFile();
    if(isFile==true){
        let fileName = path.basename(dirpath);
        console.log(indent +"___"+fileName);
    }else{
        let dirName = path.basename(dirpath);
        console.log(indent + "......"+dirName);
        let childrens = fs.readdirSync(dirpath);
        for(let i=0;i<childrens.length;i++){
            let childpath = path.join(dirpath,childrens[i]);
            treeHelper(childpath,indent + "\t");
        }
    }
}
module.exports = {
    treeKey : treefn
}