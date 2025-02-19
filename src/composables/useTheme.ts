import { ref, watch } from "vue";
import { useStorage } from "@vueuse/core";

export const useTheme = () => {
  const theme = useStorage("theme", "light");
  const systemTheme = ref(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  const updateTheme = () => {
    const root = window.document.documentElement;
    if (theme.value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  watch(theme, updateTheme, { immediate: true });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      systemTheme.value = e.matches ? "dark" : "light";
    });

  return {
    theme,
    systemTheme,
    toggleTheme,
  };
};
