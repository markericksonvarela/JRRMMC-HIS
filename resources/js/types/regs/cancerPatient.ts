export interface Patient {
    id: string;
    name: string;
    age: number;
    diagnosis: string;
    stage: CancerStage;
    dateRegistered: string;
    followUpStatus?: FollowUpStatus;
}

export type CancerStage = 'Stage I' | 'Stage II' | 'Stage III' | 'Stage IV';
export type FollowUpStatus = 'Form 4' | 'Form 2' | 'Form 1' | 'Pending' | 'Completed' | 'Form 3';