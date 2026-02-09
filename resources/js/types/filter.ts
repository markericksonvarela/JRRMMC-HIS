export interface OutpatientFilters {
    search?: string;
    service?: string;
    start_date?: string;
    end_date?: string;
}

export interface CancerRegistryFilters {
    search?: string;
    followUpStatus?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface AdmissionFilters {
    search?: string;
    wardType?: string;
    admissionDate?: string;
}

export interface EmergencyFilters {
    search?: string;
    triageLevel?: string;
    dateFrom?: string;
    dateTo?: string;
}