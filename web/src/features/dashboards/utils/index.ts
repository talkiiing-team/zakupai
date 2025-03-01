export const extractDashboardName = (key: string) => {
  return key.split('/').splice(-1).join('')
}
