import ko from 'knockout';
import Workflow from 'viewmodels/workflow';
import createMovieWorkflowTemplate from 'templates/views/components/plugins/create-movie-workflow-plugin.htm';
// DEFINE EXTRA STEP COMPONENTS HERE AS NEEDED
import 'views/components/workflows/final-step';

export default ko.components.register('create-movie-workflow', {
    viewModel: function(params) {
        this.componentName = 'create-movie-workflow';
        this.quitUrl = "/search";
        this.stepConfig = [
            {
                title: 'Create Movie Resource',
                name: 'set-info',
                required: true,
                workflowstepclass: 'create-movie-step',
                informationboxdata: {
                    heading: 'Create historic resource here',
                    text: 'Begin by providing the name and type of historic resource you are adding to the database.',
                },
                layoutSections: [
                    {
                        componentConfigs: [
                            {
                                componentName: 'default-card',
                                uniqueInstanceName: 'Actors', /* unique to step */
                                tilesManaged: 'one',
                                parameters: {
                                    graphid: 'f5b96ef2-c206-4f7f-8ff0-0e322ecf7801',
                                    nodegroupid: '6d5fc3d0-44a5-4f20-80b8-86bb42818eee',
                                    nodeOptions: {
                                        '6d5fc3d0-44a5-4f20-80b8-86bb42818eee': {
                                            disabled: true,
                                            allowInstanceCreation: false,
                                            widget: {
                                                visible: true
                                            },
                                            config: {
                                                label: "I have changed!",
                                                placeholder: "This is my new placeholder"
                                            },
                                            node: {
                                                isrequired: true
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Finish',
                name: 'add-resource-complete',  /* unique to workflow */
                description: 'Finish the resource creation.',
                layoutSections: [
                    {
                        componentConfigs: [
                            { 
                                componentName: 'final-step',
                                uniqueInstanceName: 'create-resource-final',
                                tilesManaged: 'none',
                                parameters: {
                                    resourceid: "['set-info']['Actors][0]['resourceInstanceId']",
                                },
                            },
                        ], 
                    },
                ],
            }
        ];
        
        // Now Workflow should work as a proper constructor
        Workflow.apply(this, [params]);
    },
    template: createMovieWorkflowTemplate,
});