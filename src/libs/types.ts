import express from "express";
import { User } from "../modules/users/types";

export interface Context {
    user: User
}

export interface Request extends express.Request {
    context: Context
}