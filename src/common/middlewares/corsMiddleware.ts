import { Next, Req, Res } from "../types";

export function corsMiddleware(req: Req, res: Res, next: Next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
    res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");

    next();
}
