import { notFound } from "next/navigation";

/*
  後台只在本機存在。

  這裡故意寫成「非 production 才 import」而不是「production 就 notFound()」——
  bundler 會把 process.env.NODE_ENV 直接換成常數，整個 if 區塊（連同裡面的
  動態 import）在 production build 會被消掉，後台介面的程式碼不會出現在線上資產裡。
  反過來寫的話 bundler 判斷不出 notFound() 不會回傳，chunk 還是會被產出。
*/
export default async function AdminPage() {
  if (process.env.NODE_ENV !== "production") {
    const { default: AdminEditor } = await import("./AdminEditor");
    return <AdminEditor />;
  }
  notFound();
}
