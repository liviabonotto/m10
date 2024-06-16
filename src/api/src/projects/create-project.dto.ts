export class CreateProjectDto {
    name: string;
    environments: { name: string }[];
}
