<template>
  <div class="min-h-screen flex flex-col">
    <div class="navbar bg-base-100 shadow-sm mb-3">
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <NuxtLink to="/" class="text-2xl">Winona</NuxtLink>
        </div>
        <div class="flex-none">
          <ThemeToggle dropdownPosition="dropdown-bottom" />
        </div>
      </div>
    </div>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="footer mt-5 sm:footer-horizontal items-center px-4 py-3 border-t border-base-300">
      <aside class="grid-flow-col items-center">
        <p>Copyright © {{ new Date().getFullYear() }} - All right reserved</p>
      </aside>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <ThemeToggle dropdownPosition="dropdown-top" />
      </div>
    </footer>
  </div>
</template>
