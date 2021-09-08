import { hasContext, getContext, setContext } from 'svelte';
import { identity } from 'svelte/internal';
import { derived, writable } from 'svelte/store';

const SECTION_CONTEXT_KEY = {};
class Node {
    constructor(title, parent, index = 0) {
        this.index = 0;
        this.title = title;
        this.index = index;
        this.parent = parent;
    }
    /**
     * @ignore
     */
    _setElement(element) {
        this.element = element;
        return this;
    }
    getTitle() {
        return this.title;
    }
    getElement() {
        return this.element;
    }
    getDepth() {
        if (this.parent) {
            return this.parent.getDepth() + 1;
        }
        else {
            return 1;
        }
    }
    getIndex() {
        return this.index;
    }
    getId() {
        return "" + (this.getIndex() + 1);
    }
    getFullId() {
        if (this.parent) {
            return this.parent.getFullId() + "." + this.getId();
        }
        else {
            return this.getId();
        }
    }
    getLookupArray() {
        if (this.parent) {
            return this.parent.getLookupArray().concat([this.getIndex()]);
        }
        else {
            return [this.getIndex()];
        }
    }
}
class DefinitionNode extends Node {
}
class SectionNode extends Node {
    constructor() {
        super(...arguments);
        this.root = null;
        this.sections = [];
        this.definitions = [];
    }
    /**
     * @ignore
     */
    _init(parent) {
        this.index = parent.sections.length;
        this.parent = parent;
        this.root = parent.root;
        parent.sections.push(this);
        return this;
    }
    /**
     * @ignore
     */
    _initRoot(root) {
        this.root = root;
        return this;
    }
    createDefinition(title) {
        const definition = new DefinitionNode(title, this, this.definitions.length);
        this.definitions.push(definition);
        const store = derived(this.root, (_root) => definition);
        this.root.update(identity);
        return store;
    }
    getSections() {
        return this.sections;
    }
    getDefinitions() {
        return this.definitions;
    }
}
function hasSectionNode() {
    return hasContext(SECTION_CONTEXT_KEY);
}
function getSectionNode() {
    return getContext(SECTION_CONTEXT_KEY);
}
function createSectionNode(title) {
    const sectionNode = new SectionNode(title), store = writable(sectionNode);
    if (hasSectionNode()) {
        getSectionNode().update((parentSection) => {
            sectionNode._init(parentSection);
            return parentSection;
        });
    }
    else {
        sectionNode._initRoot(store);
    }
    setContext(SECTION_CONTEXT_KEY, store);
    return store;
}
function getSectionNodeFromInstance(instance) {
    return instance.$$.context.get(SECTION_CONTEXT_KEY);
}

export { DefinitionNode, Node, SECTION_CONTEXT_KEY, SectionNode, createSectionNode, getSectionNode, getSectionNodeFromInstance, hasSectionNode };
//# sourceMappingURL=section.js.map
