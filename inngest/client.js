import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "quickcart",
    name: "QuickCart",
    isDev: process.env.INNGEST_DEV === "1",
});