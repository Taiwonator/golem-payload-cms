import { ApiClient, ApiClientInMemoryContextProvider} from '@northflank/js-client';

type PortForwardingResult = {
  data?: {
    type: 'addon' | 'service';
    projectId: string;
    id: string;
    address: string;
    port: number;
    portName?: string;
    protocol?: 'HTTP' | 'TCP' | 'UDP';
    hostnames: string[];
  };
  error?: {
    message: string;
  };
};

(async () => {
  // Create context to store credentials.
  const contextProvider = new ApiClientInMemoryContextProvider();
  await contextProvider.addContext({
      name: 'golem-payload-cms',
      token: process.env.JWT_SECRET, // Use token retrieved from Northflank web interface: Account Settings > API > Tokens > Create API token.
  });

  // Initialize API client.
  const apiClient = new ApiClient(contextProvider);

  // Retrieve list of projects and log to console.
  const projects = (await apiClient.list.projects({})).data.projects;

  // Create a new project.
  await apiClient.create.project({
    data: { name: 'test-project', region: 'europe-west', description: 'test project description' },
  });
})();