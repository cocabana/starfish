export type SizeOptions = {
  width?: number,
  height?: number
}

export class ProfileOptions {
  bgColor?: string;
  bgGradient?: string;
  bgImg?: string;
  bgUrl?: string;
  avatar?: string;
  name?: string;
  did?: string
  timestamp?: number;
  qrCodeLink?: string;
  badges?: BadgeOptions[];
  encoding?: string;
  bio?: string;
  title?: string;
  accentColor?: string;
}

export class BadgeOptions {
  id?: string;
  visible?: boolean;
  provider?: string;
  label: string;
}