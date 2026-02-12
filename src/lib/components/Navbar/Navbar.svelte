<script lang="ts">
  import NavLink from './NavLink.svelte';
</script>

<nav class="flex items-center justify-between">
  <div class="logo">
    <picture>
      <source media="(max-width: 768px)" srcset="/images/logo-small.svg" />
      <img src="/images/logo-large.svg" alt="Flashcard App Logo" />
    </picture>
  </div>
  <ul
    class="navbar flex h-full items-center gap-1 rounded-full border border-neutral-900 p-1 shadow-xs"
  >
    <NavLink href="/study">Study Mode</NavLink>
    <NavLink href="/all-cards">All Cards</NavLink>
  </ul>
</nav>

<style>
  .navbar {
    background-color: var(--neutral-0);
  }
</style>
