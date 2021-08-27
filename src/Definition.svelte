<script lang="ts">
  import { getSectionNode } from "./section";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  export let title: string;

  const section = getSectionNode(),
    definition = get(section).createDefinition(title);

  let element: HTMLDivElement;

  onMount(() => {
    $definition._setElement(element);
  });
</script>

<div {...$$restProps} bind:this={element}>
  <slot definition={$definition} />
</div>
