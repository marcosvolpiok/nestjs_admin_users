import { Injectable } from '@nestjs/common';
import { ResponseInterface } from './response.interface';

@Injectable()
export class ResponseService
{
    constructor(
    ) {}

    getResponse(data: Object, status: String, message: String = null): ResponseInterface {
        if (status == 'OK') {
            return {
                data,
                status: status
            }
        } else if (status == 'ERROR') {
            return {
                data: {
                    message: message
                },
                status: status
            }
        } else {
            return {
                data: {
                    message: 'Unknown status'
                },
                status: 'ERROR'
            }            
        }
    }
}