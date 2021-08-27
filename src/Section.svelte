<script lang="ts">
  import { createSectionNode } from "./section";
  import { onMount } from "svelte";

  export let title: string;

  const section = createSectionNode(title);

  let element: HTMLDivElement;

  onMount(() => {
    $section._setElement(element);
  });
</script>

<div {...$$restProps} bind:this={element}>
  <slot section={$section} />
</div>
