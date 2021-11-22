# Device State Management

The browsers breakpoint tracking is handled by [seng device state tracker](https://github.com/mediamonks/seng-device-state-tracker) in this skeleton.

## Configuration

- Open the config file found here: `./src/data/seng/deviceStateConfig.ts`.
- Update the breakpoint pixel values in the `mediaQueries` variable to match the breakpoints you are using with your CSS.

## Usage

```typescript
// import package helpers and config data
import DeviceStateTracker, {DeviceStateEvent} from 'seng-device-state-tracker';
import {mediaQueries, DeviceState} from './data/seng/deviceStateConfig';

// initaillize deviceStateTracker
const deviceStateTracker: DeviceStateTracker = new DeviceStateTracker({
  mediaQueries,
  deviceState: DeviceState,
});

export class LitScaffold extends LitElement {
  // use this lifecycle hook to set the device listener
  connectedCallback() {
    super.connectedCallback();
    deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, () => {
      const {state} = deviceStateTracker.currentDeviceState;

      console.log(state);

      if (state === DeviceState.TABLET_PORTRAIT) {
        // do something at this breakpoint
      }
    });
  }

  // use this lifecycle hook to destory the event listener when the component is unmounted
  disconnectedCallback() {
    super.disconnectedCallback();
    deviceStateTracker.removeEventListener(
      DeviceStateEvent.STATE_UPDATE,
      () => {}
    );
  }

  protected render() {}
}
```
