
// настройки подключения к серверу
export interface NtripSettings {
  server: string,
  port?: number,
  login: string,
  password: string,
  mountPoint: string
}
