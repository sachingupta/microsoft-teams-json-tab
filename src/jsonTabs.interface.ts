
export interface IPreviewCard {
    title: string;
    subTitle: string;
    heroImageSrc: string;
}

export interface IState {
    results : Array<IPreviewCard>;
    viewOption: string;  
}

export interface ITaskModule {
    title: string;
    height: number;
    width: number;
    url: string;
    card: any;
}

export interface ICardResponse {
    contentType: string;
    content: any;
    preview: IPreviewCard;
}