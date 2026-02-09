import axios from 'axios';

export interface AdmissionLog {
    enccode: string;
    hpercode: string;
    admdate: string; // Added admdate field
    patfirst: string;
    patmiddle: string;
    patlast: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number | null;
    to: number | null;
}

export const admissionHelper = {
    // Get paginated admissions
    getDatatable: async (params: {
        page?: number;
        per_page?: number;
        search?: string;
    }): Promise<PaginatedResponse<AdmissionLog>> => {
        const response = await axios.get('api/admission/datatable', { params });
        return response.data;
    },

    // Get single admission
    getId: async (enccode: string): Promise<AdmissionLog> => {
        const response = await axios.get(`/admission/${enccode}`);
        return response.data;
    },

    // Create admission
    store: async (data: Partial<AdmissionLog>): Promise<AdmissionLog> => {
        const response = await axios.post('/admission', data);
        return response.data;
    },

    // Update admission
    update: async (enccode: string, data: Partial<AdmissionLog>): Promise<AdmissionLog> => {
        const response = await axios.put(`/admission/${enccode}`, data);
        return response.data;
    },

    // Delete admission
    delete: async (enccode: string): Promise<void> => {
        await axios.delete(`/admission/${enccode}`);
    },
};