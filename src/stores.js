import { writable } from "svelte/store";

export const user = writable(JSON.parse(localStorage.getItem("user")) || {
    id: "",
    privileged: "",
    username: "",
    secret: "",
});