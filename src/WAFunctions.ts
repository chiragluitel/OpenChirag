import { client } from "./config.js"
import qrcode from 'qrcode-terminal'
import { executeCommandOnMac } from "./executor.js"
import { GetScriptFromLLM } from "./GetScriptFromLLM.js";

export const WAInitiateLogin = () => {
    client.initialize();

    client.on('qr', (qr)=> {
        console.log ('You are not logged into WhatsApp. Please login with QR Below: ')
        qrcode.generate(qr, {small: true})
    })
    client.on('ready', ()=>{
        console.log ('Logged in Succesfully. You are ready to go!')
        console.log('Step 2: Chirag is now monitoring inbox! Send any message to WhatsApp')
    })
}

export const WAStartMonitoringChat = () => {
    //Self
    client.on('message_create', async(msg) =>{
        console.log(`Message received from: ${msg.from}. Message: ${msg.body}`);
        console.log(`Sending that over to LLM to decode now`)
        const text = msg.body.toLowerCase();
        const script = await GetScriptFromLLM(text);
        console.log(`Sending ----- ${script} ----- to be executed`)
        await executeCommandOnMac(script);
    })

    client.on('message', async(msg)=>{
        console.log(`Message received from: ${msg.from}. Message: ${msg.body}`);
        console.log(`Sending that over to LLM to decode now`)
        const text = msg.body.toLowerCase();
        const script = await GetScriptFromLLM(text);
        console.log(`Sending ----- ${script} ----- to be executed`)
        await executeCommandOnMac(script);
    })
}

export const WALogOut = () => {
    client.destroy();
    console.log('Client Logged Out')
}