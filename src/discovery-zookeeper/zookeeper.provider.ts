import { Provider } from '@nestjs/common';
import ZooKeeper from 'zookeeper/lib/zk_promise';
import { ZOOKEEPER_CONFIG, ZOOKEEPER_TOKEN } from './zookeeper.constants';
import { ZookeeperConfig } from './zookeeper-config.interface';

export const zookeeperProvider: Provider = {
  provide: ZOOKEEPER_TOKEN,
  useFactory: async (config: ZookeeperConfig) => new Promise((resolve, reject) => {
    const zookeeper = new ZooKeeper();
    zookeeper.connect(config, err => err ? reject(err) : resolve(zookeeper));
  }),
  inject: [ZOOKEEPER_CONFIG]
}
