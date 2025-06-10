import axios from 'axios';

export class ProductBoardClient {
  constructor(apiToken, baseUrl = 'https://api.productboard.com') {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'X-Version': '1'
      }
    });
  }

  async getNotes() {
    try {
      const response = await this.client.get('/notes');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notes: ${error.message}`);
    }
  }

  async getFeatures() {
    try {
      const response = await this.client.get('/features');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch features: ${error.message}`);
    }
  }

  async getComponents() {
    try {
      const response = await this.client.get('/components');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch components: ${error.message}`);
    }
  }

  async getProducts() {
    try {
      const response = await this.client.get('/products');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async getObjectives() {
    try {
      const response = await this.client.get('/objectives');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch objectives: ${error.message}`);
    }
  }

  async getInitiatives() {
    try {
      const response = await this.client.get('/initiatives');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch initiatives: ${error.message}`);
    }
  }

  async getReleases() {
    try {
      const response = await this.client.get('/releases');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch releases: ${error.message}`);
    }
  }

  async getReleaseGroups() {
    try {
      const response = await this.client.get('/release-groups');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch release groups: ${error.message}`);
    }
  }

  async getCompanies() {
    try {
      const response = await this.client.get('/companies');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }
  }

  async getUsers() {
    try {
      const response = await this.client.get('/users');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 406) {
        console.warn('⚠️  Users endpoint not available (406 - Not Acceptable). This endpoint may not be supported.');
        return { data: [] };
      }
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }
}