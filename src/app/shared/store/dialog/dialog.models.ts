import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export declare type OpenConfig = {
    component: any;
    componentInstances?: any;
    options?: NgbModalOptions;
};

export declare type DialogBtnConfig = {
    text?: string;
    icon?: string;
    cls?: string;
    callback?: () => void;
    preventClose?: boolean;
};

export declare type DialogConfig = {
    title: string;
    content?: string;
    cancel?: DialogBtnConfig;
    confirm?: DialogBtnConfig;
    options?: NgbModalOptions;
};

export const DefaultConfig = {
    content: '',
    cancel: { text: 'global.entity.action.cancel', cls: 'btn-secondary', icon: 'ban' },
    confirm: { text: 'global.entity.action.valider', cls: 'btn-secondary', icon: 'times' },
    options: {}
};
