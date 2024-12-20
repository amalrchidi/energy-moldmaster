import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { githubService } from '../services/githubService';

const GitHubSetup = () => {
  const [token, setToken] = useState('');
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { toast } = useToast();

  const handleAuthenticate = async () => {
    try {
      await githubService.authenticate(token);
      toast({
        title: "Authentication successful",
        description: "You've successfully connected to GitHub",
      });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your token and try again",
        variant: "destructive",
      });
    }
  };

  const handleCreateRepo = async () => {
    try {
      await githubService.createRepository(repoName, description, isPrivate);
      toast({
        title: "Repository created",
        description: `Successfully created repository: ${repoName}`,
      });
    } catch (error) {
      toast({
        title: "Failed to create repository",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="token">GitHub Personal Access Token</Label>
        <Input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your GitHub token"
        />
        <Button onClick={handleAuthenticate} className="w-full">
          Authenticate
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="repoName">Repository Name</Label>
          <Input
            id="repoName"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="Enter repository name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter repository description"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="private">Private Repository</Label>
        </div>

        <Button onClick={handleCreateRepo} className="w-full">
          Create Repository
        </Button>
      </div>
    </div>
  );
};

export default GitHubSetup;