import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export interface Client {
  id: string;
  name: string;
  domain: string;
  status: "ACTIVE" | "PENDING" | "REJECTED";
  industry?: string;
  targets?: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  keywords?: Keyword[] | number;
  rankings?: Ranking[];
  avgPosition?: number;
  topRankings?: number;
  traffic?: number;
}

export interface Keyword {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  position?: number;
  url?: string;
  projectId: string;
  createdAt: string;
}

export interface Ranking {
  id: string;
  keyword: string;
  position: number;
  previousPosition?: number;
  url: string;
  searchVolume: number;
  date: string;
  projectId: string;
}

interface ClientState {
  clients: Client[];
  currentClient: Client | null;
  keywords: Keyword[];
  rankings: Ranking[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  currentClient: null,
  keywords: [],
  rankings: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async () => {
    try {
      const response = await api.get("/clients");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch clients"
      );
    }
  }
);

export const createClient = createAsyncThunk(
  "client/createClient",
  async ({ id, data }: { id: string; data: any }) => {
    try {
      const response = await api.post(`/clients/${id}`, { data });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create client"
      );
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async ({ id, data }: { id: string; data: any }) => {
    try {
      const response = await api.put(`/clients/${id}`, { data });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update client"
      );
    }
  }
);

export const fetchKeywords = createAsyncThunk(
  "client/fetchKeywords",
  async (clientId: string) => {
    try {
      const response = await api.get(`/clients/${clientId}/keywords`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch keywords"
      );
    }
  }
);

export const addKeyword = createAsyncThunk(
  "client/addKeyword",
  async ({
    clientId,
    keyword,
    searchVolume,
  }: {
    clientId: string;
    keyword: string;
    searchVolume: number;
  }) => {
    try {
      const response = await api.post(`/clients/${clientId}/keywords`, {
        keyword,
        searchVolume,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add keyword");
    }
  }
);

export const fetchRankings = createAsyncThunk(
  "client/fetchRankings",
  async (clientId: string) => {
    try {
      const response = await api.get(`/clients/${clientId}/rankings`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch rankings"
      );
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentClient: (state, action) => {
      state.currentClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch clients";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        // replace updated client in the list
        const idx = state.clients.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) {
          state.clients[idx] = action.payload;
        }
      })
      .addCase(fetchKeywords.fulfilled, (state, action) => {
        state.keywords = action.payload;
      })
      .addCase(addKeyword.fulfilled, (state, action) => {
        state.keywords.push(action.payload);
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.rankings = action.payload;
      });
  },
});

export const { clearError, setCurrentClient } = clientSlice.actions;
export default clientSlice.reducer;
