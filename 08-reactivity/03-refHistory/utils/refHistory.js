import { ref, watchEffect, reactive } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([]);
  let reactiveHistory = reactive(history);

  watchEffect(
    () => {
      reactiveHistory.value.push(source.value)
    },
    {
      flush: 'sync',
    }
  )
  
  return { history };
}
