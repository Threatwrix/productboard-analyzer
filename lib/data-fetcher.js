import { ProductBoardClient } from './productboard-client.js';

export class DataFetcher {
  constructor(apiToken) {
    this.client = new ProductBoardClient(apiToken);
  }

  async fetchAllData() {
    console.log('Fetching data from ProductBoard...');
    
    try {
      const [
        notes,
        features,
        components,
        products,
        objectives,
        initiatives,
        releases,
        releaseGroups,
        companies,
        users
      ] = await Promise.allSettled([
        this.client.getNotes(),
        this.client.getFeatures(),
        this.client.getComponents(),
        this.client.getProducts(),
        this.client.getObjectives(),
        this.client.getInitiatives(),
        this.client.getReleases(),
        this.client.getReleaseGroups(),
        this.client.getCompanies(),
        this.client.getUsers()
      ]);

      return {
        notes: this.handleResult(notes, 'notes'),
        features: this.handleResult(features, 'features'),
        components: this.handleResult(components, 'components'),
        products: this.handleResult(products, 'products'),
        objectives: this.handleResult(objectives, 'objectives'),
        initiatives: this.handleResult(initiatives, 'initiatives'),
        releases: this.handleResult(releases, 'releases'),
        releaseGroups: this.handleResult(releaseGroups, 'releaseGroups'),
        companies: this.handleResult(companies, 'companies'),
        users: this.handleResult(users, 'users')
      };
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  handleResult(result, type) {
    if (result.status === 'fulfilled') {
      console.log(`✓ Fetched ${type}`);
      // Extract the data array from API response
      const value = result.value;
      return value && value.data ? value.data : value;
    } else {
      console.log(`✗ Failed to fetch ${type}: ${result.reason.message}`);
      return null;
    }
  }

  async fetchFeatures() {
    return await this.client.getFeatures();
  }

  async fetchNotes() {
    return await this.client.getNotes();
  }

  async fetchObjectives() {
    return await this.client.getObjectives();
  }

  async fetchInitiatives() {
    return await this.client.getInitiatives();
  }

  async fetchReleases() {
    return await this.client.getReleases();
  }
}