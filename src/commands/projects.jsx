export default {
  name: 'projects',
  description: 'Open projects.json in the editor.',
  run: () => ({
    type: 'open-tab',
    tab: { id: 'projects', title: 'projects.json', icon: 'data_object', kind: 'projects' }
  })
};
