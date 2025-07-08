<script lang="ts">
  import ThemeToggle from "./ThemeToggle.svelte";
  let isOpen = false;

  function toggleMenu(event: Event) {
    const input = event.target as HTMLInputElement;
    isOpen = input.checked;
  }
</script>

<nav
  class="w-full px-4 py-5 flex justify-between items-center bg-base-100 sticky top-0 z-50"
>
  <div class="max-w-3xl w-full mx-auto flex justify-between items-center">
    <!-- Logo -->
    <div class="text-xl font-bold">
      <a href="/">🌿 隆海站点</a>
    </div>

    <!-- 菜单按钮（移动端） -->
    <label class="btn btn-circle swap swap-rotate md:hidden">
      <input type="checkbox" bind:checked={isOpen} on:change={toggleMenu} />

      <!-- Hamburger -->
      <svg
        class="swap-off fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <path
          d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
        />
      </svg>

      <!-- Close -->
      <svg
        class="swap-on fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <polygon
          points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
        />
      </svg>
    </label>

    <!-- 菜单项 -->
    <div
      class={`absolute md:relative top-16 left-0 right-0 md:top-0 md:flex md:items-center md:gap-6 md:bg-transparent bg-base-100 shadow md:shadow-none transition-all duration-300 px-6 py-4 md:px-0 md:py-0 ${
        isOpen ? "flex flex-col md:flex-row" : "hidden md:flex"
      }`}
    >
      <ul class="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
        <li>
          <a
            class="underline-offset-4 hover:underline hover:decoration-wavy hover:decoration-black-500"
            href="/">首页</a
          >
        </li>
        <li>
          <a
            class="underline-offset-4 hover:underline hover:decoration-wavy hover:decoration-black-500"
            href="/blog">文章</a
          >
        </li>
        <li>
          <a
            class="underline-offset-4 hover:underline hover:decoration-wavy hover:decoration-black-500"
            href="/food">美食</a
          >
        </li>
        <li>
          <a
            class="underline-offset-4 hover:underline hover:decoration-wavy hover:decoration-black-500"
            href="/about">关于</a
          >
        </li>
      </ul>
      <!-- GitHub 和主题按钮 -->
      <div
        class="mt-6 md:mt-0 md:ml-6 flex justify-center md:justify-end ju w-full md:w-auto gap-4"
      >
        <a
          href="https://github.com/RonHaiT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 64 64"
            ><path
              fill="currentColor"
              d="M32 0C14 0 0 14 0 32c0 21 19 30 22 30c2 0 2-1 2-2v-5c-7 2-10-2-11-5c0 0 0-1-2-3c-1-1-5-3-1-3c3 0 5 4 5 4c3 4 7 3 9 2c0-2 2-4 2-4c-8-1-14-4-14-15q0-6 3-9s-2-4 0-9c0 0 5 0 9 4c3-2 13-2 16 0c4-4 9-4 9-4c2 7 0 9 0 9q3 3 3 9c0 11-7 14-14 15c1 1 2 3 2 6v8c0 1 0 2 2 2c3 0 22-9 22-30C64 14 50 0 32 0"
            />
          </svg>
        </a>
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>
