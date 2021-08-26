export interface Lecture{
    pk: number;
    description: string; 
    date_created: Date;
    name: string;
    image?: File;
}