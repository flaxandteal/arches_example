# My App

### Description
This app contains a workflow and 2 models Movie and Person.
This is to demonstrate how you are able to modify a workflow node through a workflow config
This is built to run on 8.1.0a0 and above

### Installation

Arches Example... (thanks to Cyrus for the base text from the Dashboard example).

You can add the arches example into your project in a few easy steps

1. Install if from this repo (or clone this repo and pip install it locally). 
```
pip install git+https://github.com/flaxandteal/arches_example.git
```

2. Add `"arches_example"` to the INSTALLED_APPS setting in the demo project's settings.py file below the demo project:
```
INSTALLED_APPS = [
    ...
    "demo",
    "arches_example",
]
```

3. Version your dependency on `"arches_example"` in `pyproject.toml`:
```
dependencies = [
    "arches>=8.1.0a0",
    "arches_example",
]
```

4. From your project run migrate to add the model included in the app:
```
python manage.py migrate
```

5. Next be sure to rebuild your project's frontend to include the plugin:
```
npm run build_development
```