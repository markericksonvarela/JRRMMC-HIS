export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './patient';
export type * from './pagination';
export type * from './filter';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export type { Patient, CancerPatient, CancerStage, FollowUpStatus } from './patient';
export type { PaginationLink, PaginationMeta, PaginatedResponse } from './pagination';
export type { 
    OutpatientFilters, 
    CancerRegistryFilters, 
    AdmissionFilters, 
    EmergencyFilters 
} from './filter';