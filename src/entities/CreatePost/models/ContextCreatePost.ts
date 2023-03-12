import {createContext} from "solid-js";
import type {SetStoreFunction} from "solid-js/store"
import {ICreatePostStore} from "~/entities/CreatePost/helpers";

export const ContextCreatePost = createContext<{
    getPostStore: ICreatePostStore;
    setPostStore: SetStoreFunction<ICreatePostStore>;
}>()
