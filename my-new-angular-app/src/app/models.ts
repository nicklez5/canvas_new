export class Test{
    id: Number;
    description: string;
    date_created: Date;
    name: string;
    file: File;
    max_points: Number;
    student_points: Number;
}
export class Lecture{
    id: number;
    description: string; 
    date_created: Date;
    name: string;
    file: File;
}
export class Assignment{
    constructor(){}
    public name: string;
    public date_created: Date;
    public max_points: Number;
    public student_points: Number;
    public description: string;
    public id: Number;
    public file: File;
}

export class Course{
    constructor(){}
    public name: string;
    public lectures: Lecture[];
    public profiles: Profile[];
    public assignments: Assignment[];
    public pk: Number;
}
export class Canvas{
    constructor(){}
    public list_courses: Course[];
    public current_course: Course;
    public pk: Number; 
}
export class Profile{
    constructor(){}
    public pk: Number;
    public email: string;
    public first_name: string;
    public last_name: string;
    public date_of_birth: Date;
}
export class CustomUser{
    constructor(){}
    public username: string;
    public email: string;
    public is_staff: boolean;
    public pk: Number;
    public profile: Profile;
    public canvas: Canvas; 
}

