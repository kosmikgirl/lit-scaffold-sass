# Routing

The routing is set up using [navigo](https://github.com/krasimir/navigo).

## Routes

Each route is defined in `./src/router/routes.ts`. 

A route exists of the following:
```typescript
{
  name: RouteNames.HOME;
  path: '/';
  tag:  literal`home-page`;
}
```

- `name`: is used to navigate to a specific route within the application.
- `path`: speaks for itself.
- `tag`: is the name of page that should be rendered

### Adding a route

There are a few things that need to be added to create a new route.

First add a new route name to the `RouteNames` enum in `./src/data/enum/route.ts` like so:
```typescript
export enum RouteNames {
  ...,
  NAME_OF_PAGE = 'name-of-page', // This is the new route
}
```

Then go to `./src/router/routes.ts` to make the route accessible to the router
```typescript
...
import `../page/name-of-page`;

export const routes: ReadonlyArray<RouteType> = [
  ...,
  {
    name: RouteNames.NAME_OF_PAGE,
    path: '/path-to-name-of-page',
    tag: literal`name-of-page`,
  },
];
```

After that the router will have access to the new route.

### Adding parameters to a route

Some routes will require a dynamic route based on for example an id or slug. This is possible by doing the following.

```typescript
path: `/path-to-name-of-page/:${RouteDataParam.ID || RouteDataParam.SLUG}`,
```

By default `ID` and `SLUG` are defined as valid parameters. 

If any other parameters are required these can be added in `./src/data/enum/route.ts` and adding the new parameter to `enum RouteDataParam`.

### Accessing parameters from a route

To access any data from the route the page class needs to extend `PageElement`. Once that is the case all data from the route can be accessed as follows:
```typescript
this.routeData[RouteDataParam.ID] 
```

## Localized routes

To enable localized routes make sure that `VAR_IS_LOCALE_ENABLED` is set to `true` in the `.env` file. 

This will automatically prefix the route with the set default locale.

## Navigation

There are 2 ways to navigate to a specific route. Both ways are using the `<router-link>` element.

The `<router-link>` element is preferred for local navigation. If there's some navigation that goes to an external url please use `<a href="">` in stead.

Navigating within the website can be done as follows:
```typescript jsx
<router-link 
  to="/path-to-name-of-page"
  title="Name of page"
>
  Go to name of page
</router-link>
```
or
```typescript jsx
<router-link
  to=${{ name: RouteNames.NAME_OF_PAGE }}
  title="Name of page"
>
  Go to name of page
</router-link>
```

### Navigating with parameters

Navigating with parameters can be done as follows:
```typescript jsx
<router-link 
  to="/path-to-name-of-page/parameter"
  title="Name of page"
>
  Go to name of page
</router-link>
```
or
```typescript jsx
<router-link
  to=${{ 
    name: RouteNames.NAME_OF_PAGE,
    routeData: {
      [RouteDataParam.ID]: 'parameter',
    },
  }}
  title="Name of page"
>
  Go to name of page
</router-link>
```