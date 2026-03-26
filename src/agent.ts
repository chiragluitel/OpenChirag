import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal'
import { executeCommandOnMac } from './executor.js';

const client = new Client({
    authStrategy: new LocalAuth()
});

export const startAgent = () =>{
    client.on('qr', (qr)=> {
        console.log('Scan this QR code with your phone to link WhatsApp');
        qrcode.generate(qr, {small: true})
    })

    client.on('ready', () => {
        console.log('Chirag is online and listening in WhatsApp')
    })

    client.on('message_create', async(msg) =>{
        console.log(`Message received from: ${msg.from}. Message: ${msg.body}`);
        const text = msg.body.toLowerCase();

        if(text.includes('open')){
            await executeCommandOnMac(text);
            msg.reply('Action executed succesfully in Mac!')
        }else{
            msg.reply('Unfortunately, I dont know this command');
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



    client.initialize();
};

export const stopAgent = () =>{
    client.destroy();
}   