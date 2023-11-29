import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { InternalServerError, NotFoundError, BadRequestError } from "../middlewares/errorHandler";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType : true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.send(user); 
  } catch (error) {
    next(error);
  }
}
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType : true,
        createdAt: true,
        updatedAt: true,
      }
    });
    res.status(200).json(users); 
  } catch (error) {
    throw new InternalServerError("Something went wrong");
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, password, image, userType} = req.body;
    if (!name && !password && !image && !userType) {
      throw new BadRequestError("Bad request");
    }
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        password,
        image,
        userType,
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType : true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json(user); 
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType : true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json(user); 
  } catch (error) {
    next(error);
  }
}