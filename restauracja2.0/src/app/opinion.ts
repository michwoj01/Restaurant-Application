export interface Opinion{
  nick:string;
  title:string;
  body:string;
  date:Date | undefined;
}
export class myOpinion{
  nick:string;
  title:string;
  body:string;
  date: Date | undefined;
  constructor(object:Opinion) {
    this.nick = object.nick;
    this.title = object.title;
    this.body = object.body;
    this.date = object.date;
  }
}
