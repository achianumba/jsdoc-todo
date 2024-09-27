import { JSDocEvent, type Dictionary } from "./lib/types";
export declare function defineTags(dictionary: Dictionary): void;
declare function processingComplete(e: JSDocEvent): void;
export declare const handlers: {
    processingComplete: typeof processingComplete;
};
export declare const todoPlugin: string;
export default todoPlugin;
