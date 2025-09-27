import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enums/permission.enum';

export const RequirePermissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);
