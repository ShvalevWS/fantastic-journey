// Сим-карта
export interface SimCard {
  imei: string,
  operator: string,
  phone: string,
  type: MobileNetworkType,
  apn: APN,
  enabled: boolean
}

// настройки APN
export interface APN {
  apn: string,
  userName: string,
  password: string
}

export type MobileNetworkType = '2G' | '3G' | '4G' | '5G'
