<script lang="ts">
  import { page } from '$app/stores';

  let { href, children } = $props();

  const isActive = $derived($page.url.pathname === href);
</script>

<li class="list-none">
  <a
    {href}
    class="nav-link text-preset-4-medium block rounded-full px-4 py-2 transition-colors"
    class:border={isActive}
    class:border-neutral-900={isActive}
    class:current={isActive}>{@render children()}</a
  >
</li>

<style>
  .nav-link {
    background-color: var(--neutral-0);
  }
  .current {
    background-color: var(--yellow-500);
  }
</style>
