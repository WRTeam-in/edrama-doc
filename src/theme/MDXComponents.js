import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Screen from '@site/src/components/Screen';
import {Steps, Path, Pill, Flow, Cards, HelpBanner, Access, Defaults, Icon} from '@site/src/components/Docs';
import {DomainInput, ServerUrl} from '@site/src/components/Domain';
import {Checklist, ChecklistGroup, ChecklistItem} from '@site/src/components/Checklist';
import EarningsCalculator from '@site/src/components/EarningsCalculator';
import CommonGuide from '@site/src/components/CommonGuide';

/**
 * Components every page can use without importing them:
 * Screen, Steps, Path, Pill, Flow, Cards, HelpBanner, Access, Defaults, Tabs and TabItem,
 * DomainInput and ServerUrl (personalised addresses), Checklist / ChecklistGroup / ChecklistItem,
 * EarningsCalculator, and CommonGuide (a link card into WRTeam's common app guide).
 */
export default {
  ...MDXComponents,
  Tabs,
  TabItem,
  Screen,
  Steps,
  Path,
  Pill,
  Flow,
  Cards,
  HelpBanner,
  Access,
  Defaults,
  Icon,
  DomainInput,
  ServerUrl,
  Checklist,
  ChecklistGroup,
  ChecklistItem,
  EarningsCalculator,
  CommonGuide,
};
