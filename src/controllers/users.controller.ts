import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { InternalServerError, NotFoundError, BadRequestError, successHandler } from "../middlewares";
import {googleUserProfile} from "../interfaces";

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
    successHandler(req, res, user);
  } catch (error) {
    next(error);
  }
}
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    //add query params to filter archived users
    let users;
    const params = req.query;
    if (params.isArchived) {
      users = await prisma.user.findMany({
        where: {
          isArchived: true,
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
      successHandler(req, res, users);
    }
    else {
      users = await prisma.user.findMany({
        where: {
          isArchived: false,
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
      successHandler(req, res, users);
    }
    
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
    successHandler(req, res, user);
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        isArchived: true,
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
    successHandler(req, res, user, 204)
  } catch (error) {
    next(error);
  }
}

