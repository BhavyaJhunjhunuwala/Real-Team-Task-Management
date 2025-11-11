import { IsString, IsMongoId } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name!: string;

  @IsMongoId({ message: 'Invalid team ID' })
  teamId!: string;
}

