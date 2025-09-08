import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

export interface Project {
  id: string;
  name: string;
  domain: string;
  status: "ACTIVE" | "PAUSED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  agencyId: string;
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

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  keywords: Keyword[];
  rankings: Ranking[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  keywords: [],
  rankings: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ name, domain }: { name: string; domain: string }) => {
    try {
      const response = await api.post("/projects", { name, domain });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }
);

export const fetchKeywords = createAsyncThunk(
  "project/fetchKeywords",
  async (projectId: string) => {
    try {
      const response = await api.get(`/projects/${projectId}/keywords`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch keywords"
      );
    }
  }
);

export const addKeyword = createAsyncThunk(
  "project/addKeyword",
  async ({
    projectId,
    keyword,
    searchVolume,
  }: {
    projectId: string;
    keyword: string;
    searchVolume: number;
  }) => {
    try {
      const response = await api.post(`/projects/${projectId}/keywords`, {
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
  "project/fetchRankings",
  async (projectId: string) => {
    try {
      const response = await api.get(`/projects/${projectId}/rankings`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch rankings"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
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

export const { clearError, setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
