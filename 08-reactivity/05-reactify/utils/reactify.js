import { computed, ref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => computed(() => {
    let refArguments = []; 
    for (let i = 0; i < args.length; i++) {
      if (args[i].value === undefined) {
        args[i] = ref(args[i])
        refArguments.push(args[i].value)
      } else {
        refArguments.push(args[i].value)
      }
    }
    return func(...refArguments)
  })
}
