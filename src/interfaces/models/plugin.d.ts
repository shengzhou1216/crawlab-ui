import {
  PLUGIN_DEPLOY_MODE_ALL,
  PLUGIN_DEPLOY_MODE_MASTER,
  PLUGIN_STATUS_ERROR,
  PLUGIN_STATUS_RUNNING,
  PLUGIN_STATUS_STOPPED,
  PLUGIN_INSTALL_TYPE_NAME,
  PLUGIN_INSTALL_TYPE_GIT,
  PLUGIN_INSTALL_TYPE_LOCAL,
} from '@/constants/plugin';

declare global {
  interface CPlugin extends BaseModel {
    name?: string;
    description?: string;
    type?: string;
    proto?: string;
    active?: boolean;
    endpoint?: string;
    cmd?: string;
    event_key?: {
      include?: string;
      exclude?: string;
    };
    install_type?: PluginInstallType;
    install_url?: string;
    deploy_mode?: PluginDeployMode;
    auto_start?: boolean;
    ui_components?: PluginUIComponent[];
    ui_sidebar_navs?: MenuItem[];
    ui_assets?: PluginUIAsset[];
    status?: PluginStatus[];
  }

  interface PluginUIComponent {
    name?: string;
    title?: string;
    src?: string;
    type?: string;
    path?: string;
    parent_paths?: string[];
    children?: PluginUIComponent[];
  }

  interface PluginUIAsset {
    path?: string;
    type?: string;
  }

  type PluginDeployMode = PLUGIN_DEPLOY_MODE_MASTER | PLUGIN_DEPLOY_MODE_ALL;

  interface PluginStatus extends BaseModel {
    plugin_id?: string;
    node_id?: string;
    node?: CNode;
    status?: PLUGIN_STATUS_STOPPED | PLUGIN_STATUS_RUNNING | PLUGIN_STATUS_ERROR;
    pid?: number;
    error?: string;
  }

  type PluginInstallType = PLUGIN_INSTALL_TYPE_NAME | PLUGIN_INSTALL_TYPE_GIT | PLUGIN_INSTALL_TYPE_LOCAL;
}
