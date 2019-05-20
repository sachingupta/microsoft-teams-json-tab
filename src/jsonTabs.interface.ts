
export interface IPreviewCard {
    title: string;
    subTitle: string;
    heroImageSrc: string;
}

export interface IState {
    renderList : Array<IPreviewCard>;
    viewOption: string;  
}