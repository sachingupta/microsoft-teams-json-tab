export interface IPreviewCard {
    title: string;
    subTitle?: string;
    heroImageSrc?: string;
}

export interface ICard {
    contentType: string;
    content: any;
    preview: IPreviewCard;
}

// TODO
// TEMPORARY FIX BEFORE SDK PUBLISH
export interface BotResponse {
    data: any
}