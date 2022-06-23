import {RouteLocationNormalized} from 'vue-router';

export declare global {
  interface RouterAuthOptions {
    beforeEachFn?: Function;
    afterEachFn?: Function;
    validateFn?: (to: RouteLocationNormalized, from?: RouteLocationNormalized) => boolean;
  }
}
