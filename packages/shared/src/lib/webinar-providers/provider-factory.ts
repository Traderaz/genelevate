import { WebinarProvider } from '../../types/webinar';
import { MockWebinarProvider } from './mock-provider';
// Future imports:
// import { ZoomWebinarProvider } from './zoom-provider';
// import { TeamsWebinarProvider } from './teams-provider';
// import { MeetWebinarProvider } from './meet-provider';

export type WebinarProviderType = 'mock' | 'zoom' | 'teams' | 'meet' | 'custom';

export class WebinarProviderFactory {
  private static providers = new Map<WebinarProviderType, WebinarProvider>();

  static registerProvider(type: WebinarProviderType, provider: WebinarProvider): void {
    this.providers.set(type, provider);
  }

  static getProvider(type: WebinarProviderType): WebinarProvider {
    let provider = this.providers.get(type);
    
    if (!provider) {
      // Create default providers on-demand
      switch (type) {
        case 'mock':
          provider = new MockWebinarProvider();
          break;
        // case 'zoom':
        //   provider = new ZoomWebinarProvider();
        //   break;
        // case 'teams':
        //   provider = new TeamsWebinarProvider();
        //   break;
        // case 'meet':
        //   provider = new MeetWebinarProvider();
        //   break;
        default:
          throw new Error(`Unsupported webinar provider: ${type}`);
      }
      
      this.providers.set(type, provider);
    }

    return provider;
  }

  static getSupportedProviders(): WebinarProviderType[] {
    return ['mock']; // Add more as they're implemented: 'zoom', 'teams', 'meet'
  }

  static isProviderSupported(type: string): type is WebinarProviderType {
    return this.getSupportedProviders().includes(type as WebinarProviderType);
  }

  static clearProviders(): void {
    this.providers.clear();
  }
}

// Initialize default providers
WebinarProviderFactory.registerProvider('mock', new MockWebinarProvider());
