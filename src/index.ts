#!/usr/bin/env node
import {Command} from 'commander'
import { WAInitiateLogin, WALogOut, WAStartMonitoringChat } from './WAFunctions.js';


const program = new Command();

program
    .name('chirag')
    .description('A personal assistant')
    .version('1.0.0')

program
    .command('run')
    .description('Starts Chirag up')
    .action(()=>{
        console.log('Hey! Chirag is now up and running. You can talk to me through whatsapp.');
        console.log('Step 1: Checking if you are logged into WhatsApp');
        WAInitiateLogin();
        console.log('Step 2: Chirag is now monitoring inbox!')
        WAStartMonitoringChat();
    })

program
    .command('stop')
    .description('Shuts Chirag down')
    .action(()=>{
        console.log('Chirag is sleeping now...');
        WALogOut();
        process.exit(0);
    })

program.parse();