import { NextFunction, Request, Response } from "express";

export const successHandler = (
    req: Request,
    res: Response,
    data: any,
    statusCode: number = 200,
) => {
    
    const sucessResponse = {
        timestamp: new Date().toISOString(),
        path: req.path,
        success: true,
        status: statusCode,
        data: data,        
    };
    
    res.status(sucessResponse.status).json(sucessResponse);
};

