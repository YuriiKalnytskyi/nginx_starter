import { Toaster } from 'react-hot-toast';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import { toastContainer } from '@/module/common/component';
import * as theme from '@/theme';

import * as Styled from './app.styled';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  },
  queryCache: new QueryCache({
    onError: (_, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toastContainer.error({ title: 'error' }).then();
      }
    }
  })
});

const env = process.env.VITE_APP_ENV;

function App() {
  const test = async () => {
    await toastContainer.success({ title: 'success' });
    await toastContainer.error({ title: 'error' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyles />
      dkdckdmckkdc
      <button onClick={test}>dcmkcd</button>
      <QueryClientProvider client={queryClient}>
        {env === 'local' ? (
          <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />
        ) : null}
        <Toaster position='top-center' reverseOrder />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
