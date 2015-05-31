**Glue** - is a module for control you server module, compose them without
clear indication that module.

## Debug mode

Debug mode - is a helper for development components.

If it is enabled, `glue` can do `undo/redo` steps of component states.

**Example**
```javascript
var glue = require('glue'), component;

glue.debug.enable();

component = glue.get('componentName');

component.set('value', 1);
component.get('value'); // => 1

component.set('value', 2);
component.get('value'); // => 2

component.undo();
component.get('value'); // => 1

component.redo();
component.get('value'); // => 2
```

**File watching**

When enabled `debug` mode, `glue` watching file in npm directory. If file is
changed, `glue` makes following:

1. Clear cache of changed module
2. Return changed version of module in calling `glue.get` method.
3. Save old version of module in `component.history`
4. Save old version of file in `component.fileHistory`


## API

### .debug.enable()

Enable Debug mode

### .debug.disable()

Disable debug mode

### .register(options)

Register new type of component

**Arguments**
  * `options` - [ `String` | `Object` ] Name or options of type component.

**Example**

```javascript
var glue = require('glue'),
    moduleOptions = {
      name: 'type',
      directory: __dirname,
    };

glue.register(moduleOptions);

// options.directory by default is a root of npm package
glue.register('type2');
```
### .get(name)

Return new Immutable component

### .reload(name)

Clean cache of `name` module.
