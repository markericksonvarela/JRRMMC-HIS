import axios from 'axios';

export interface AdmissionLog {
    enccode: string;
    hpercode: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export const admissionHelper = {
    // Get paginated admissions
    getDatatable: async (params: {
        page?: number;
        per_page?: number;
        search?: string;
    }): Promise<PaginatedResponse<AdmissionLog>> => {
        const response = await axios.get('/admission/index', { params });
        return response.data;
    },

    // Get single admission (for future use)
    getId: async (id: string): Promise<AdmissionLog> => {
        const response = await axios.get(`/admission/${id}`);
        return response.data;
    },

    // Create admission (for future use)
    store: async (data: Partial<AdmissionLog>): Promise<AdmissionLog> => {
        const response = await axios.post('/admission', data);
        return response.data;
    },

    // Update admission (for future use)
    update: async (id: string, data: Partial<AdmissionLog>): Promise<AdmissionLog> => {
        const response = await axios.put(`/admission/${id}`, data);
        return response.data;
    },

    // Delete admission (for future use)
    delete: async (id: string): Promise<void> => {
        await axios.delete(`/admission/${id}`);
    },
};