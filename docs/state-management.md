# State management

The state management is set up with [Redux toolkit](https://redux.js.org/tutorials/typescript-quick-start).

This toolkit allows the user to create slices to separate states into smaller manageable chunks.

## Slice

A slice looks like the following:

```typescript
export type NameOfState = {
  state: string;
};

export const nameOfSlice = createSlice({
  name: 'nameOfSlice',
  initialState: {
    state: '',
  },
  reducers: {
    setState(state: NameOfState, action: PayloadAction<string>) {
      state.state = action.payload;
    },
  },
});

export const {setState} = nameOfSlice.actions;

export default nameOfSlice.reducer;
```

- `name`: the namespace of the slice (this is used to get a specific slice from the store)
- `initialState`: contains all the state that is managed by the slice
- `reducers`: contains all the reducers that manage the specified state

## Creating a new slice

To create a new slice, run `npm run plop` and choose `slice`. This will generate a new slice and create a new file in `./src/store/module`.

After that, go to `./src/store/store.ts` and add the new slice as follows:

```typescript
...
import nameOfSliceReducer from './module/name-of-slice.ts';

const store = configureStore({
  reducer: {
    ...
    nameOfSlice: nameOfSliceReducer,
  },
});
```

## Submitting a state change to the gobal store

To change a value in the global state, import and execute an action that updates it. For example:

```typescript
import {setState} from '../store/module/name-of-slice';

class SomeClass {
  ...
  someMethod() {
    setState('new state');
  }
  ...
}
```

## Retrieving state from store

Connect components to the store in order to be able to listen to state changes:

```typescript
class SomeClass extends connect(store)(LitElement) {
  @state()
  private state = '';

  stateChanged({nameOf: {state}}: {nameOf: nameOfState}) {
    this.state = state;
  }
}
```

This will connect the state from the store to the component and will trigger a re-render whenever the state changes.
