import axios from 'axios';

export interface AdmissionLog {
    enccode: string;
    hpercode: string;
    admdate: string;
    patient_name: string; // This matches what your backend returns
    patsex: string;
    age: number;
    admtime: string;
    tsdesc: string;
    wardname: string;
    wardcode: string;
    rmname: string;
    bdname: string;
    admstat: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number | null;
    to: number | null;
    tab_counts?: Record<string, number>;
}

export const admissionHelper = {
    // Get paginated admissions
    getDatatable: async (params: {
        page?: number;
        per_page?: number;
        search?: string;
        ward?: string;
        status?: string;
    }): Promise<PaginatedResponse<AdmissionLog>> => {
        const response = await axios.get('/api/admission/datatable', { 
            params: {
                page: params.page || 1,
                per_page: params.per_page || 15,
                search: params.search || '',
                ward: params.ward || '',
                status: params.status || '',
            }
        });
        return response.data;
    },

    // Get single admission
    getId: async (enccode: string): Promise<AdmissionLog> => {
        const response = await axios.get(`/api/admission/${enccode}`);
        return response.data;
    },

    // Create admission
    store: async (data: Partial<AdmissionLog>): Promise<AdmissionLog> => {
        const response = await axios.post('/api/admission', data);
        return response.data;
    },

    // Update admission
    update: async (enccode: string, data: Partial<AdmissionLog>): Promise<AdmissionLog> => {
        const response = await axios.put(`/api/admission/${enccode}`, data);
        return response.data;
    },

    // Delete admission
    delete: async (enccode: string): Promise<void> => {
        await axios.delete(`/api/admission/${enccode}`);
    },
};