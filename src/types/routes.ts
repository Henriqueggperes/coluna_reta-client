export enum RoutePath {
    LOGIN = "/",
    BACKOFFICE = "/backoffice",
    HOMEADMIN = "/backoffice-admin",
    STUDENT = "/backoffice-student/:id",
    USER = "/backoffice-user/:id",
    RECOVER= "/recover/password/:token"
}