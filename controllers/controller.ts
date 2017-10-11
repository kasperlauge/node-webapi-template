import { Router } from "express";

export interface IController {
    instantiateRoutes(): void;
}