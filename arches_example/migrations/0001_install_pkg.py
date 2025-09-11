from django.db import migrations
from django.core.management import call_command
import os
import json
import pkg_resources

def load_graphs_and_plugins(apps, schema_editor):
    """Load graphs and plugins from installed package"""
    
    try:
        package_name = 'arches_example'
        
        try:
            print("Running arches example migration")
            graphs_path = pkg_resources.resource_filename(package_name, 'data/graphs/resource_models')
            print(f"Graph path {graphs_path}")
            if os.path.exists(graphs_path):
                print("Found graph path")
                for filename in os.listdir(graphs_path):
                    if filename.endswith('.json'):
                        graph_file = os.path.join(graphs_path, filename)
                        print("Found graph file")
                        try:
                            call_command('packages', '-o', 'import_graphs', '-s', graph_file)
                            print(f"Successfully imported graph: {filename}")
                        except Exception as e:
                            print(f"Error importing graph {filename}: {e}")
        except Exception as e:
            print(f"No graphs found in package: {e}")
        
        try:
            plugins_path = pkg_resources.resource_filename(package_name, 'plugins')
            print(f"Plugins path {plugins_path}")
            if os.path.exists(plugins_path):
                print("Found plugin path")
                for filename in os.listdir(plugins_path):
                    if filename.endswith('.json'):
                        print("Found plugin file")
                        plugin_file = os.path.join(plugins_path, filename)
                        try:
                            call_command('plugin', 'register', '--source', plugin_file)
                            print(f"Successfully imported plugin: {filename}")
                        except Exception as e:
                            print(f"Error registering plugin {filename}: {e}")
        except Exception as e:
            print(f"No plugins found in package {e}")
            
    except Exception as e:
        print(f"Error loading package resources: {e}")

class Migration(migrations.Migration):

    dependencies = [
        ('models', '12394_resource_identifier'),
        ('guardian', '0002_generic_permissions_index')
    ]

    operations = [
        migrations.RunPython(load_graphs_and_plugins),
    ]