import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prismaClient';
import bcryptjs from 'bcryptjs';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
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

