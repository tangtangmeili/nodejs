import fs from 'fs-plus'
import path from 'path'
let lsStarted = false;
let lsprocess;

export async function startLS(A, B) {
    if (!fs.isDirectory(jdkHome)) {
        throw new Error('missing jdk. ');
    }

    let params=[];
    params.push();
    params.push();
    lsprocess=new Buffer({
        env,
        command:'java',
        args:params,
        stdout:(data)=>{
            
        }
    })
}