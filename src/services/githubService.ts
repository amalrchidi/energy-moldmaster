import { Octokit } from 'octokit';

export class GitHubService {
  private octokit: Octokit | null = null;

  async authenticate(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async createRepository(name: string, description: string, isPrivate: boolean = false) {
    if (!this.octokit) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        description,
        private: isPrivate,
        auto_init: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating repository:', error);
      throw error;
    }
  }
}

export const githubService = new GitHubService();