'use client';

import { ComponentProps } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import clsx from "clsx";

type Props = {
  className?: string;
};

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
  namespace: "MyEditor",
  onError: (error) => console.error(error),
};

export const MyEditor = ({className}: Props): JSX.Element => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={clsx('relative max-w-4xl', className)}>
        <RichTextPlugin
          contentEditable={<ContentEditable style={{"minHeight": "300px"}} className="p-2.5 rounded-md bg-white outline-none" />}
          placeholder={<div className="absolute top-3 left-3">type something...</div>}
          ErrorBoundary={() => <p>Error...</p>}
        />
      </div>
      <HistoryPlugin />
    </LexicalComposer>
  );
};
