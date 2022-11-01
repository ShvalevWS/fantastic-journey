// состояние мобильной сети: level - уровень сигнала 0-100, networkName - название сети
export interface MobileConnectionStatus {
  level: number,
  networkName: string
}
