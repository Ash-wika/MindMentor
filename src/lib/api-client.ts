const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Log the base URL for debugging
console.log("API Base URL:", API_BASE_URL);

export const apiClient = {
  async getCuratedResources(userId: string) {
    const url = `${API_BASE_URL}/curate-resources/${userId}`;
    console.log("Fetching curated resources from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for auth if needed
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch resources: ${response.status} - ${errorData.message || "Unknown error"}`);
    }
    return response.json();
  },

  async createCuratedResources(userId: string, subject: string) {
    const url = `${API_BASE_URL}/curate-resources`;
    console.log("Creating curated resources at:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, subject }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === "RESOURCE_EXISTS") return data;
      throw {
        status: response.status,
        error: data.error,
        message: data.message || "Failed to create resources",
        response: { data },
      };
    }

    return data;
  },

  async getStudyPlan(userId: string) {
    const url = `${API_BASE_URL}/generate-plan/${userId}`;
    console.log("Fetching study plan from:", url); // Debug log

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for auth if needed
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to fetch study plan: ${response.status} - ${errorData.message || "Unknown error"}`);
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error in getStudyPlan:", error);
      throw error; // Re-throw for the caller to handle
    }
  },

  async createStudyPlan(userId: string, subject: string, examDate: string) {
    const url = `${API_BASE_URL}/generate-plan`;
    console.log("Creating study plan at:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId, subject, examDate }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === "PLAN_EXISTS") return data;
      throw {
        status: response.status,
        error: data.error,
        message: data.message || "Failed to create study plan",
        response: { data },
      };
    }

    return data;
  },

  async deleteStudyPlan(planId: string) {
    const url = `${API_BASE_URL}/generate-plan/${planId}`;
    console.log("Deleting study plan at:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        error: data.error,
        message: data.message || "Failed to delete plan",
        response: { data },
      };
    }

    return data;
  },

  async deleteCuratedResources(resourceId: string) {
    const url = `${API_BASE_URL}/curate-resources/${resourceId}`;
    console.log("Deleting curated resources at:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to delete resources: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  },
};