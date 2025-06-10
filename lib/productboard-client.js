import axios from 'axios';

export class ProductBoardClient {
  constructor(apiToken, baseUrl = 'https://api.productboard.com') {
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getNotes() {
    try {
      const response = await this.client.get('/getnotes-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notes: ${error.message}`);
    }
  }

  async getFeatures() {
    try {
      const response = await this.client.get('/getfeatures-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch features: ${error.message}`);
    }
  }

  async getComponents() {
    try {
      const response = await this.client.get('/getcomponents-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch components: ${error.message}`);
    }
  }

  async getProducts() {
    try {
      const response = await this.client.get('/getproducts-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async getObjectives() {
    try {
      const response = await this.client.get('/getobjectives-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch objectives: ${error.message}`);
    }
  }

  async getInitiatives() {
    try {
      const response = await this.client.get('/getinitiatives');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch initiatives: ${error.message}`);
    }
  }

  async getReleases() {
    try {
      const response = await this.client.get('/listreleases-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch releases: ${error.message}`);
    }
  }

  async getReleaseGroups() {
    try {
      const response = await this.client.get('/listreleasegroups-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch release groups: ${error.message}`);
    }
  }

  async getCompanies() {
    try {
      const response = await this.client.get('/getcompanies-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }
  }

  async getUsers() {
    try {
      const response = await this.client.get('/getusers-1');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }
}