
import type { APIEvent } from "solid-start/api";
export function GET({request}:APIEvent) {
    return new Response("Hello World");
}