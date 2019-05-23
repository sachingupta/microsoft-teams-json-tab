
export interface IPreviewCard {
    title: string;
    subTitle: string;
    heroImageSrc: string;
}

export interface IState {
    results : Array<IPreviewCard>;
    viewOption: string;  
}