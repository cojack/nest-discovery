import { iterate } from 'iterare';
import * as ZooKeeper from 'zookeeper';
import { Inject, Injectable } from '@nestjs/common';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';
import { DiscoveryAdapter } from '../discovery/discovery-adapter.interface';
import { ADAPTER_IFACE, ZOOKEEPER_TOKEN } from './zookeeper.constants';
import { IfaceConfig, ZookeeperOptions } from './zookeeper-config.interface';

@Injectable()
export class ZookeeperAdapter implements DiscoveryAdapter {
  private readonly ip: NetworkInterfaceInfo;

  constructor(
    @Inject(ZOOKEEPER_TOKEN) private readonly zookeeper,
    @Inject(ADAPTER_IFACE) private readonly iface: IfaceConfig,
  ) {
    this.ip = this.getIp();
  }

  public async register(name: string, options?: ZookeeperOptions): Promise<void> {
    await this.zookeeper.create(`${options.path}/${name}`, this.ip.address, ZooKeeper.ZOO_EPHEMERAL);
  }

  public async deregister(name: string, options?: ZookeeperOptions): Promise<void> {
    await this.zookeeper.delete_(`${options.path}/${name}`);
  }

  public async query(name: string): Promise<string> {
    return this.zookeeper.get(`/${name}`);
  }

  private getIp(): NetworkInterfaceInfo {
    const ifaces = networkInterfaces();
    if (!ifaces.hasOwnProperty(this.iface.name)) {
      throw new Error(`Current network doesn't have ${this.iface.name} iface`);
    }
    const iface = ifaces[this.iface.name];
    const found = iterate(iface).find(face => face.family == this.iface.family);
    if (!found) {
      throw new Error(`Current network doesn't have ${this.iface.name} iface with family ${this.iface.family}`);
    }
    return found;
  }
}
