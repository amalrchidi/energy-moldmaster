import GitHubSetup from '@/components/GitHubSetup';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">GitHub Repository Setup</h1>
      <GitHubSetup />
    </main>
  );
}