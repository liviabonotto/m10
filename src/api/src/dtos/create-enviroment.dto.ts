import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEnvironmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30) // Limite de 30 caracteres para o nome do ambiente
  name: string;
}