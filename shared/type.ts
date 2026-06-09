export interface PacketLog {
  timestamp: number;
  direction: "RX" | "TX";
  payload: string;
}

export interface DeviceStatus {
  hostname: string;
  cpu: number;
  ram: number;
  uptime: number;
  timestamp: number;

  logs: PacketLog[];
}
