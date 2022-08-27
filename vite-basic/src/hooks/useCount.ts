import { ref } from 'vue'

const useCount = () => {
  const count = ref(0)
  const handleAdd = () => {
    count.value++
  }

  return {
    count,
    handleAdd
  }
}

export default useCount
