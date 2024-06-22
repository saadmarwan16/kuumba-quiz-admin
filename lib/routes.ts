import { Route } from "next";

export class Routes {
  static ALL: Route = "/quizzes";
  static PUBLISHED: Route = "/quizzes/published";
  static UNPUBLISHED: Route = "/quizzes/unpublished";
  static NEW_QUIZ: Route = "/quizzes/new";
}
