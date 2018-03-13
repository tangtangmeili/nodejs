import fs from 'fs-plus'
import {startServer} from './proxy'
export async function createDebugEngine(A, B, C, D) {
    if (!fs.isDirectorySync) {
        throw new Error(`${} doesn't exist. `);
    }
    
    const promise1=startServer(A,B,C,D);
    await promise1;
    const dc =new DebugClient('java');
    dc.on('stopped',async(event)=>{
        const stopped=event.body;
        
    })
}