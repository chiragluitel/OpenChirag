import {exec} from 'child_process'

export const executeCommandOnMac = (commandText: string): Promise<String> => {
    return new Promise((resolve, reject) =>{

        let appleScript = '';
        if (commandText.includes('brave')){
            appleScript = 'tell application "Brave Browser" to activate';
        }

        if(!appleScript){
            return reject('Open received, but application not recognized');
        }

        exec(`osascript -e '${appleScript}'`, (error, stdout, stderr)=>{
            if(error){
                console.error(`Error: ${error.message}`);
                return reject(error)
            }
            resolve(stdout);
        })
    } )   
}