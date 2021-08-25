export class Assignment{
    constructor(){}
    public name: string;
    public date_created: Date;
    public max_points: Number;
    public student_points: Number;
    public description: string;
}
export class Lecture{
    constructor(){}
    public description: string;
    public date_created: Date;
    public name: string;
}
export class Course{
    constructor(){}
    public name: string;
    public lectures: Lecture[];
    public profiles: Profile[];
    public assignments: Assignment[];
}
export class Canvas{
    constructor(){}
    public list_courses: Course[];
    public current_course: Course;
}
export class Profile{
    constructor(){}
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

