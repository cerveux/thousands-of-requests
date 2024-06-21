import { Request } from "express";

interface MessageAttributes {
    user_name: string;
    user_message: string;
}

export interface MessageRequest extends Request {
    body: MessageAttributes
}