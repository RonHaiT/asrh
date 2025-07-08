<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  let year = new Date().getFullYear().toString();
  const runtimeText = writable("");

  function updateRuntime() {
    const startDate = new Date("2019/03/22 08:00:00");
    const now = new Date();
    const secondsPassed = Math.floor(
      (now.getTime() - startDate.getTime()) / 1000
    );

    const days = Math.floor(secondsPassed / 86400);
    const hours = Math.floor((secondsPassed % 86400) / 3600);
    const minutes = Math.floor((secondsPassed % 3600) / 60);
    const seconds = secondsPassed % 60;

    runtimeText.set(
      `🥰本站已运行: ${days}天${hours.toString().padStart(2, "0")}小时${minutes
        .toString()
        .padStart(2, "0")}分${seconds.toString().padStart(2, "0")}秒 💪`
    );
  }

  onMount(() => {
    updateRuntime(); // 初始化
    setInterval(updateRuntime, 1000); // 每秒更新
  });
</script>

<footer class="w-full">
  <div class="max-w-3xl w-full mx-auto flex justify-center items-center">
    <div
      class="transition flex items-center justify-center border-[oklch(85%_0.01_var(--hue))] border-dashed dark:border-white/15 flex-col mb-12 px-6 rounded-2xl"
    >
      <div class="transition text-sm text-50 text-center">
        <span>Copyright ©2019-{year}</span>
        <span>|</span>
        <a href="/rss.xml" class="font-medium link" target="_blank">RSS</a>
        /
        <a href="/sitemap-index.xml" class="font-medium link" target="_blank"
          >Sitemap</a
        >
        <p class="flex justify-center justify-items-center gap-2.5">
          <a href="https://beian.miit.gov.cn" target="_blank">
            蜀ICP备20013430号
          </a>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=50009802002049"
            class="flex justify-center justify-items-center gap-1"
            target="_blank"
          >
            <img class="h-4 w-4" src="/ga.png" alt="公安" />
            <span>渝公网安备50009802002049号</span>
          </a>
        </p>

        <!-- <p>
        <span> Powered by</span>
        <a href="https://astro.build" target="_blank" class="font-medium link"
          >Astro</a
        >
        &amp;
        <a href="https://daisyui.com/" class="font-medium link" target="_blank"
          >daisyUI</a
        >
      </p> -->
        <div class="transition text-sm text-50 text-center md:block">
          <p>{$runtimeText}</p>
        </div>
      </div>
    </div>
  </div>
</footer>
