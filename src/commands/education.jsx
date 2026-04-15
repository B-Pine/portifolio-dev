export default {
  name: 'education',
  description: 'Open education.yaml in the editor.',
  run: () => ({
    type: 'open-tab',
    tab: { id: 'education', title: 'education.yaml', icon: 'school', kind: 'education' }
  })
};
