import { MyEditor } from "../ui/editor/MyEditor";

const Page = (): JSX.Element => (
  <main className="py-10 px-20 min-h-screen bg-gray-100">
    <h1 className="text-center text-4xl">Lexical Demo</h1>
    <MyEditor className="mt-20 m-auto" />
  </main>
) ;

export default Page;
