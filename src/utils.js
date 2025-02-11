export const inputClasses = (hasError) =>
  `p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 ${
    hasError ? 'border-red-500 ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-sky-600'
  }`;

export function getNestedValue(obj, path) {
  const pathParts = path.split(/[.[\]]+/);
  let value = obj;

  for (const part of pathParts) {
    if (part === '') continue; // Игнорируем пустые строки
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return undefined; // Возвращаем undefined, если свойство не найдено
    }
  }

  return value;
}
