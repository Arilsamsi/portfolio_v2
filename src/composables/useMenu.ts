import { ref } from 'vue'

export const useMenu = () => {
  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  }
}