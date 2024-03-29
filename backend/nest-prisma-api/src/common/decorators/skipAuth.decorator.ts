import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_API = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_API, true);
