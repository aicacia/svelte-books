import { getContext, hasContext, setContext, SvelteComponent } from "svelte";
import { identity } from "svelte/internal";
import type { Writable } from "svelte/store";
import { derived, writable } from "svelte/store";

export const SECTION_CONTEXT_KEY = {};

export class Node<P extends Node<any>> {
  protected title: string;
  protected index = 0;
  protected parent?: P;
  protected element?: HTMLDivElement;

  constructor(title: string, parent?: P, index = 0) {
    this.title = title;
    this.index = index;
    this.parent = parent;
  }

  /**
   * @ignore
   */
  _setElement(element: HTMLDivElement) {
    this.element = element;
    return this;
  }

  getTitle() {
    return this.title;
  }
  getElement() {
    return this.element;
  }

  getDepth(): number {
    if (this.parent) {
      return this.parent.getDepth() + 1;
    } else {
      return 1;
    }
  }

  getIndex() {
    return this.index;
  }

  getId(): string {
    return "" + (this.getIndex() + 1);
  }

  getFullId(): string {
    if (this.parent) {
      return this.parent.getFullId() + "." + this.getId();
    } else {
      return this.getId();
    }
  }

  getLookupArray(): number[] {
    if (this.parent) {
      return this.parent.getLookupArray().concat([this.getIndex()]);
    } else {
      return [this.getIndex()];
    }
  }
}

export class DefinitionNode extends Node<SectionNode> {}

export class SectionNode extends Node<SectionNode> {
  protected root: Writable<SectionNode> = null as any;
  protected sections: SectionNode[] = [];
  protected definitions: DefinitionNode[] = [];

  /**
   * @ignore
   */
  _init(parent: SectionNode) {
    this.index = parent.sections.length;
    this.parent = parent;
    this.root = parent.root;
    parent.sections.push(this);
    return this;
  }
  /**
   * @ignore
   */
  _initRoot(root: Writable<SectionNode>) {
    this.root = root;
    return this;
  }

  createDefinition(title: string) {
    const definition = new DefinitionNode(title, this, this.definitions.length);
    this.definitions.push(definition);
    const store = derived(this.root, (_root) => definition);
    this.root.update(identity);
    return store;
  }

  getSections(): ReadonlyArray<SectionNode> {
    return this.sections;
  }
  getDefinitions(): ReadonlyArray<DefinitionNode> {
    return this.definitions;
  }
}

export function hasSectionNode() {
  return hasContext(SECTION_CONTEXT_KEY);
}

export function getSectionNode(): Writable<SectionNode> {
  return getContext<Writable<SectionNode>>(SECTION_CONTEXT_KEY);
}

export function createSectionNode(title: string) {
  const sectionNode = new SectionNode(title),
    store = writable(sectionNode);

  if (hasSectionNode()) {
    getSectionNode().update((parentSection) => {
      sectionNode._init(parentSection);
      return parentSection;
    });
  } else {
    sectionNode._initRoot(store);
  }
  setContext(SECTION_CONTEXT_KEY, store);
  return store;
}

export function getSectionNodeFromInstance(
  instance: SvelteComponent
): Writable<SectionNode> {
  return instance.$$.context.get(SECTION_CONTEXT_KEY);
}
