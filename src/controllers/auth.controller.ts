import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prismaClient';
import bcryptjs from 'bcryptjs';
import { BadRequestError } from '../middlewares/errorHandler';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password and name are required' });
        }
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (userExists) {
            throw new BadRequestError('User already exists');
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: bcryptjs.hashSync(password, 8),
                name
            }
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        next(err);
    }
}

