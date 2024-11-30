export interface ServerFunctions {
  getMyModuleOptions: () => object
}

export interface ClientFunctions {
  showNotification: (message: string) => void
}