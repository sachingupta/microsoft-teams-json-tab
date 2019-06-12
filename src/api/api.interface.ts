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
export interface QueryResponse {
    attachments: IAttachment[],
    layout: any;
}

export interface IAttachment {
    card: any;
    previewCard: any;
    previewRawPayload: any,
    rawPayload: any;
}

export interface ICommand {
    title: string;
    id: string;
}
