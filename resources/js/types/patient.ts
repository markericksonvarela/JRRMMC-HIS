export interface Patient {
    enccode: string;
    hpercode: string;
    name: string;
    patsex: string;
    age: string;
    tsdesc: string;
    opddate?: string;
    opdtime?: string;
    opddisp?: string;
    opdstat?: string;
}

export interface CancerPatient {
    id: string;
    name: string;
    age: number;
    diagnosis: string;
    stage: CancerStage;
    dateRegistered: string;
    followUpStatus?: FollowUpStatus;
}

export type CancerStage = 'Stage I' | 'Stage II' | 'Stage III' | 'Stage IV';
export type FollowUpStatus = 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4 - Initial Follow Up' | 'Pending' | 'Completed';