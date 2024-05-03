import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith('/letter')){
        let cookie = cookies().get('jwtoken')
        if(!cookie){
            return NextResponse.rewrite(new URL('/login', request.url))
        }
    }
}