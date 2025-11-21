import type { PaymentStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

enum PaymentStatusEnum {
	PENDING = 'PENDING',
	PAYED = 'PAYED'
}

export class PaymentDto {
	@IsOptional()
	@IsEnum(PaymentStatusEnum)
	status: PaymentStatus

	@IsNumber()
	amount: number
}
