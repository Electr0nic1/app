export const url = "http://juippre-m2.prof.ru/api-kosmos"

export const ErrorMessage = (err) => {
  return  typeof err === 'string' ? err : err?.join?.(", ");
}