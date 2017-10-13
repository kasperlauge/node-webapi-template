import { Container } from 'addict-ioc';
import { Server } from './server';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { Router } from 'express';
import { ValuesController } from './controllers/valuesController';
import { ValuesService } from './services/valuesService';

export class Ioc {
    constructor() { }
    public static setUpDependencyInjections(container) {
        container.registerObject('di', container);
        container.registerObject('express', express);
        container.registerObject('app', express());
        container.registerObject('cors', cors);
        container.registerObject('bodyParser', bodyParser);
        container.registerObject('fs', fs);
        container.register('router', Router);

        // Register services here
        container.register('valuesService', ValuesService);

        // Register controllers
        container.register('valuesController', ValuesController)
            .dependencies(
            'app',
            'valuesService')
            .singleton();

        container.register('server', Server)
            .dependencies(
            'app',
            'express',
            'cors',
            'bodyParser',
            'fs',
            'valuesController'
            )
            .singleton();
    }
}