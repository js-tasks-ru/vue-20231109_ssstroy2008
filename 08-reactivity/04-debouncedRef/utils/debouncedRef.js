import { ref, watch, reactive } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  const debounced = ref(null);
  watch(
    () => source.value,
    () => {
      const waitSource = () => {
        debounced.value = source.value;
      }
      const debounceFunc = debounce(waitSource, wait);
      debounceFunc();
    },
    {
      immediate: true,
    }
  )

  return debounced;
}
