export const trackEvent = (
  action: string,
  category: string,
  label: string,
  data?: object
): void => {
  if (!window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    ...data,
  })
}
