export interface IPreviewCard {
  title: string;
  subTitle?: string;
  heroImageSrc?: string;
}

export interface ICard {
  contentType: string;
  content: any;
  preview: IPreviewCard;
  botId: string;
}
