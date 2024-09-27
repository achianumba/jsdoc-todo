export interface ToDoPluginConfig {
  heading: string;
  headingLevel: number;
  outFile: string;
  tag: string;
  endTag: string;
}

export interface DocletMetadata {
  filename: string;
  path: string;
  lineno: number;
}

export interface Doclet {
  comment: string;
  meta: DocletMetadata;
}

export interface Tag {
  originalTitle: string;
  title: string;
  text: string;
  value: string;
}

export interface TagOptions {
  onTagged: (doclet: Doclet, tag: Tag) => void;
}

export interface Dictionary {
  defineTag: (tagTitle: string, tagOptions: TagOptions) => void;
}

export interface JSDocEvent {
  doclets: Array<Doclet>;
}