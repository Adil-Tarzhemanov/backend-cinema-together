import type { UserRole } from '@prisma/client'
import { IsEmail, IsEnum, IsString } from 'class-validator'

enum UserRoleEnum {
	USER = 'USER',
	ADMIN = 'ADMIN'
}

export class UpdateUserDto {
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsEnum(UserRoleEnum)
	role: UserRole
}
