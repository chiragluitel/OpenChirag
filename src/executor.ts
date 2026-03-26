import {exec} from 'child_process'

export const executeCommandOnMac = (commandText: string): Promise<String> => {
    return new Promise((resolve, reject) =>{
        exec(`osascript -e '${commandText}'`, (error, stdout, stderr)=>{
            if(error){
                console.error(`Error: ${error.message}`);
                return reject(error)
            }
            resolve(stdout);
            console.log('Success!');
        })
    } )   
}