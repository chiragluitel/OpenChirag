import { client } from "./config.js"
import qrcode from 'qrcode-terminal'
import { executeCommandOnMac } from "./executor.js"

export const WAInitiateLogin = () => {
    client.initialize();

    client.on('qr', (qr)=> {
        console.log ('You are not logged into WhatsApp. Please login with QR Below: ')
        qrcode.generate(qr, {small: true})
    })
    client.on('ready', ()=>{
        console.log ('Logged in Succesfully. You are ready to go!')
    })
}

export const WAStartMonitoringChat = () => {
    client.on('message_create', async(msg) =>{
        console.log(`Message received from: ${msg.from}. Message: ${msg.body}`);
        const text = msg.body.toLowerCase();

        if(text.includes('open')){
            await executeCommandOnMac(text);
            msg.reply('Action executed succesfully in Mac!')
        }else{
            console.log('Couldnt parse the message/no open command given')
        }
    })

    client.on('message', async(msg)=>{
        const text = msg.body.toLowerCase();

        //to implement NLP here
        if(text.includes('open')){
            await executeCommandOnMac(text);
            msg.reply('Action executed on Mac!');
        }
    })
}

export const WALogOut = () => {
    client.destroy();
    console.log('Client Logged Out')
}