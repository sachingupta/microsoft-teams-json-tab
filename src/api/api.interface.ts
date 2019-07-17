export interface IPreviewCard {
  title: string;
  subTitle?: string;
  text?: string;
  heroImageSrc?: string;
}

export interface ICard {
  contentType: string;
  content: any;
  preview: IPreviewCard;
  botId: string;
}

export interface OverflowAction {
  type: string;
  title: string;
  id: string;
  url?: string;
  enabled: boolean;
}
