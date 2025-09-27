import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      name: 'SOS Cancer API',
      version: '1.0.0',
      description: 'API for SOS Cancer support platform',
      status: 'running',
      timestamp: new Date().toISOString()
    };
  }
}
