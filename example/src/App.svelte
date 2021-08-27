<script lang="ts">
  import { onMount, SvelteComponent } from "svelte";
  import type { SectionNode } from "@aicacia/books";
  import {
    Section,
    Definition,
    Header,
    getSectionNodeFromInstance,
  } from "@aicacia/books";

  let instance: SvelteComponent;
  let root: SectionNode;

  onMount(() => {
    root = getSectionNodeFromInstance(instance);
  });
</script>

<Section bind:this={instance} title="Root" let:section>
  <Header level={section.getDepth()}
    >{section.getTitle()} {section.getFullId()}</Header
  >

  <Section title="Parent" let:section>
    <Header level={section.getDepth()}
      >{section.getTitle()} {section.getFullId()}</Header
    >

    <Definition title="Definition">
      <p>This is a definition.</p>
    </Definition>

    <Section title="Child" let:section>
      <Header level={section.getDepth()}
        >{section.getTitle()} {section.getFullId()}</Header
      >
    </Section>
  </Section>
</Section>
