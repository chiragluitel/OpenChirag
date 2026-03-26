#!/usr/bin/env node
import {Command} from 'commander'
import { startAgent, stopAgent } from './agent.js';


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
        startAgent();
    })

program
    .command('stop')
    .description('Shuts Chirag down')
    .action(()=>{
        console.log('Chirag is sleeping now...');
        stopAgent();
        process.exit(0);
    })

program.parse();