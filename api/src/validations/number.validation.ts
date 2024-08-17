import { BadRequestException } from '@nestjs/common'

export async function validateMinMax(value: string): Promise<void> {
  const valueNumber = parseFloat(value)

  if (valueNumber < 0.1 || valueNumber > 9999999999999.99) {
    throw new BadRequestException(
      'finalValue must be between 0.1 and 9999999999999.99',
    )
  }
}
