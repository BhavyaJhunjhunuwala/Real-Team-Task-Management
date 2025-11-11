import { IsString, IsIn, IsOptional, IsMongoId, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['Low', 'Medium', 'High'])
  @IsOptional()
  priority?: 'Low' | 'Medium' | 'High';

  @IsDateString({}, { message: 'Invalid date format' })
  @IsOptional()
  dueDate?: string;

  @IsMongoId({ message: 'Invalid assignee ID' })
  assignee!: string;

  @IsIn(['To Do', 'In Progress', 'Review', 'Done'])
  @IsOptional()
  status?: 'To Do' | 'In Progress' | 'Review' | 'Done';

  @IsMongoId({ message: 'Invalid project ID' })
  project!: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['Low', 'Medium', 'High'])
  @IsOptional()
  priority?: 'Low' | 'Medium' | 'High';

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsMongoId()
  @IsOptional()
  assignee?: string;

  @IsIn(['To Do', 'In Progress', 'Review', 'Done'])
  @IsOptional()
  status?: 'To Do' | 'In Progress' | 'Review' | 'Done';
}