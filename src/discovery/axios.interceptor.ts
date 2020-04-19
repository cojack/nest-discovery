import { HttpService, Provider } from '@nestjs/common';
import { ADAPTER_PROVIDER, AXIOS_INTERCEPTOR } from './discovery.constants';
import { DiscoveryAdapter } from './discovery-adapter.interface';

export const axiosInterceptor: Provider = {
  provide: AXIOS_INTERCEPTOR,
  useFactory: async (adapterProvider: DiscoveryAdapter, httpService: HttpService) => {
    httpService.axiosRef.interceptors.request.use(async config => {
      const url = new URL(config.baseURL);
      const paths = url.hostname.split('.');
      if (paths[paths.length - 1] !== 'disco') { // \o/
        return config;
      }
      const ips = await adapterProvider.query(paths[0]);
      const idx = Math.floor((Math.random() * ips.length)); // yeah! fuck load balancer
      url.hostname = ips[idx];
      config.baseURL = url.toString();
      return config;
    })
  },
  inject: [ADAPTER_PROVIDER, HttpService]
}
