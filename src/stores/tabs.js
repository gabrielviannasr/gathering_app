import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabStore = defineStore('tabs', () => {
  const activeTab = ref('home')

  function setTab(tab) {
    activeTab.value = tab
  }

  return { activeTab, setTab }
})
