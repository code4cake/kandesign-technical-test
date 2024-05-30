import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Graph } from "@/components/graph";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="grid justify-items-center pt-10 dark">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center font-normal">
              Glucose level over time
            </CardTitle>
          </CardHeader>
          <Graph />
        </Card>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
