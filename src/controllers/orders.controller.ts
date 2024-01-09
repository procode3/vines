import { Request, Response, RequestHandler, NextFunction } from 'express';
import { NotFoundError, BadRequestError, successHandler } from '../middlewares';
import {Order} from '../interfaces';
import { prisma } from '../utils/prismaClient';


export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            orderType,
            topic,
            description,
            subject,
            pages,
            words,
            clientDeadline,
            writerDeadline,
            price,
            educationLevel,
            status,
            userId,
            assignedById,
            clientId
        } = req.body;

        console.log(req.body);


        // if(!name || !orderType || !topic || !description || !subject || !pages || !words || !clientDeadline || !writerDeadline || !price || !educationLevel || !status || !userId || !assignedById || !clientId){
        //     throw new BadRequestError('All fields are required');
        // }

        if (!name) {
            throw new BadRequestError('All fields are required');
        }
        const order: any= await prisma.order.create({
            data: {
                name,
                orderType: orderType.toUpperCase(),
                topic,
                description,
                subject: subject.toUpperCase(),
                pages,
                words,
                clientDeadline: new Date(clientDeadline).toISOString(),
                writerDeadline: new Date(writerDeadline).toISOString(),
                price,
                educationLevel: educationLevel.toUpperCase(),
                status: status.toUpperCase(),
                userId,
                assignedById,
                clientId
            }
        });

        if(!order){
            throw new BadRequestError('Order not created');
        }
        successHandler(req, res, order, 201);

    } catch (error) {
        next(error);
    }
   
}
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.query;
        if(params.isArchived){
            const orders = await prisma.order.findMany({
                where: {
                    isArchived: true
                }
            });
            successHandler(req, res, orders);
        } else {
            const orders = await prisma.order.findMany({
                where: {
                    isArchived: false
                }
            }
            );
            successHandler(req, res, orders);
        }
    } catch (error) {
        next(error);
    }

}


export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const order = await prisma.order.findUnique({
            where: {
                id
            }
        });
        if(!order){
            throw new NotFoundError('Order not found');
        }
        successHandler(req, res, order);
    } catch (error) {
        next(error);
    }
}

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {
            name,
            orderType,
            topic,
            description,
            subject,
            pages,
            words,
            clientDeadline,
            writerDeadline,
            price,
            educationLevel,
            status,
            userId,
            assignedById,
            clientId
        } = req.body;

        const order = await prisma.order.update({
            where: {
                id
            },
            data: {
                name,
                orderType,
                topic,
                description,
                subject,
                pages,
                words,
                clientDeadline,
                writerDeadline,
                price,
                educationLevel,
                status,
                userId,
                assignedById,
                clientId
            }
        });

        if(!order){
            throw new BadRequestError('Order not updated');
        }
        successHandler(req, res, order);
    } catch (error) {
        next(error);
    }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const order = await prisma.order.update({
            where: {
                id
            },
            data: {
                isArchived: true
            }
        });
        if(!order){
            throw new BadRequestError('No Order deleted');
        }
        successHandler(req, res, order, 204);
    } catch (error) {
        next(error)
    }
}

