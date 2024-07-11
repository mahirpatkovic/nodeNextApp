import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { IUser } from '../interfaces/models/User';
import { DuplicateRecordError } from '../errors/DuplicateRecordError';
import { UserRepository } from '../repositories/UserRepository';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/Config';
import { log } from '../utils/logger';
import { NotAuthorizedError } from '../errors/NotAuthorizedError';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { ModelNotFoundError } from '../errors/ModelNotFoundError';

export class AuthService {
    private readonly userRepository: UserRepository = new UserRepository();

    public async register(
        payload: IUser,
        request: Request,
        response: Response,
    ): Promise<Partial<User>> {
        const existingUser: User = await this.userRepository.findExistingUser(
            payload.username,
            payload.email,
        );
        if (existingUser) {
            throw new DuplicateRecordError(
                'User with this username or email already exists.',
            );
        }

        const salt: string = await bcrypt.genSalt(12);
        const passwordHash: string = await bcrypt.hash(payload.password, salt);

        const newUser: User = await this.userRepository.create({
            ...payload,
            password: passwordHash,
        });

        return this.createSendToken(newUser, request, response);
    }

    public async login(
        username: string,
        password: string,
        request: Request,
        response: Response,
    ): Promise<Partial<User>> {
        const currentUser: User = await this.userRepository.findExistingUser(
            username,
        );

        if (
            !currentUser ||
            !(await bcrypt.compare(password, currentUser.password))
        ) {
            throw new NotAuthorizedError(
                'Wrong username or password! Please try again',
            );
        }

        return this.createSendToken(currentUser, request, response);
    }

    private signToken(id: string): string {
        return jwt.sign({ id }, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn,
        });
    }

    public createSendToken(
        user: IUser,
        req: Request,
        res: Response,
    ): Partial<User> {
        const token: string = this.signToken(user.id);

        const expiresAt: Date = new Date(
            Date.now() + config.jwtCookieExpiresIn * 24 * 60 * 60 * 1000,
        );

        res.cookie('token', token, {
            expires: expiresAt,
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        });

        // Remove password from output
        user.password = undefined;
        log.debug(`User logged in successfully, user: ${user.email}`);

        return user;
    }

    public async protect(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        let token = null;

        if (req.headers.cookie) {
            token = req.headers.cookie.split('=')[1];
        }

        const notAuthorizedMessage: string =
            'You are not logged in or your login session has expired. Please log in!';

        if (!token) {
            throw new NotAuthorizedError(notAuthorizedMessage);
        }

        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(
                token,
                config.jwtSecret,
            );

            const currentUser: User = await this.userRepository.getUser(
                decoded['id'],
            );

            if (!currentUser) {
                throw new ModelNotFoundError('User does not exist');
            }

            req.user = currentUser;
            next();
        } catch (error) {
            throw new NotAuthorizedError(notAuthorizedMessage);
        }
    }

    public async isAuthenticated(
        req: AuthenticatedRequest,
        res: Response,
    ): Promise<Partial<User>> {
        try {
            return this.createSendToken(req.user, req, res);
        } catch (error) {
            throw new NotAuthorizedError('Cannot authenticate user');
        }
    }
}
