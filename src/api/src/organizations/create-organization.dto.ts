export class CreateOrganizationDto {
    name: string;
    logo: string;
    projects: {
      name: string;
      environments: { name: string }[];
    }[];
}